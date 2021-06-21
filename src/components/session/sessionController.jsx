import React, { Component } from "react";
import ReactDOM from 'react-dom'

import "./SessionController.css";

import { SessionContext } from "../../session-context";

import { play, pause, playURI, seek } from "../../utils/spotifyInterface";
import { formatYTTitle } from "../../utils/youtubeInterface";

import { popQueue } from "../../utils/queueInterface";

import spotifyIcon from "../../resources/images/Spotify.png";
import youtubeIcon from "../../resources/images/Youtube.png";

import SeekBar from "./seekbar"


class SessionController extends Component {
  state = {
    isPlaying: global.isContentPlaying,
    isEditingQueue: false,
    editQueueText: "Edit Queue"
  };

  

  playButtonPress = () => {
    if (global.isContentPlaying) {
      global.isContentPlaying = false;
      this.setState({ isPlaying: false });
      // Check Platform
      if (global.currentlyPlaying[0] === "Youtube") {
        global.youtubePlayer.pauseVideo();
      } else if (global.currentlyPlaying[0] === "Spotify") {
        pause(global.spotifyAccessToken);
      }
    } else {
      global.isContentPlaying = true;
      this.setState({ isPlaying: true });
      // Check Platform
      if (global.currentlyPlaying[0] === "Youtube") {
        global.youtubePlayer.playVideo();
      } else if (global.currentlyPlaying[0] === "Spotify") {
        play(global.spotifyAccessToken);

      }
    }
  };

  skipPressed = () => {
    if (global.sessionQueue.length === 0) {
      console.log("queue empty");
      return;
    }

    // Pop Queue
    var upNext = popQueue();

    // Read next song and determine platform
    if (upNext[0] === "Spotify") {
      var songURI = upNext[1]["uri"];
      // Pause Youtube if it was playing
      global.youtubePlayer.pauseVideo();
      playURI(songURI, global.spotifyAccessToken);
    } else if (upNext[0] === "Youtube") {
      // Pause Spotify if it was playing
      pause(global.spotifyAccessToken);
      global.youtubePlayer.loadVideoById(upNext[1].id, 0);
    }

    global.isContentPlaying = true;
    global.currentlyPlaying = upNext;

    // Reset Song Progress Bar
    global.currentContentPosition = 0;

    // Updates State of Session
    this.context.updateSessionQueue(global.sessionQueue);


  };

  restartPressed = () => {
    var songInfo = global.currentlyPlaying[1];

    if (global.currentlyPlaying[0] === "Youtube") {
      global.youtubePlayer.loadVideoById(songInfo.id.videoId, 0);
      
    } else if (global.currentlyPlaying[1] === "Spotify") {
      const songURI = songInfo["uri"];
      playURI(songURI, global.spotifyAccessToken);

    }
    global.currentContentPosition = 0;

   
  };

  formatArtistString = (artistObj) => {
    var artistString = "";
    var numArtists = 0;

    for (var key in Object.keys(artistObj)) {
      var artist = artistObj[key];

      if (numArtists > 0) {
        artistString = artistString + ", " + artist.name;
      } else {
        artistString = artist.name;
      }
      numArtists += 1;
    }

    return artistString;
  };


  getCurrentTrackLength = () => {
    var currTrack = global.currentlyPlaying
    var trackLength = 0;

    if (currTrack === "") {
      trackLength = 0;
    } else if (currTrack[0] === "Spotify") {
      trackLength = Math.round(currTrack[1].duration_ms / 1000)
    } else if (currTrack[0] === "Youtube") {
      var duration = currTrack[1].contentDetails.duration;

      // Parse out hours minutes and seconds from duration string "PT4M15S" "4 Mins, 15 Secs"
      var hourStr = duration.split("H")[0];

      var minStr = "";
      var minutes = 0;

      var secStr = "";
      var seconds = 0;

      if (hourStr === duration) { // Duration does not have Hour
        minStr = duration.split("M")[0];
        minStr = minStr.split("T")[1];
        minutes = parseInt(minStr);

        secStr = duration.split("M")[1];
        secStr = secStr.split("S")[0];
        seconds = parseInt(secStr);
        
        trackLength = (minutes * 60) + seconds

      } else { // Duration does have Hour
        hourStr = hourStr.split("T")[1];
        var hours = parseInt(hourStr);

        minStr = duration.split("M")[0];
        minStr = minStr.split("H")[1];
        minutes = parseInt(minStr);

        secStr = duration.split("M")[1];
        secStr = secStr.split("S")[0];
        seconds = parseInt(secStr);
        
        trackLength = (hours * 60 * 60) + (minutes * 60) + seconds
      }
    }

    return trackLength
  }

  seek = (time) => {
    if (global.currentlyPlaying !== "") {
    
      if (global.currentlyPlaying[0] === "Youtube") {
        global.currentContentPosition = time;
        global.youtubePlayer.seekTo(time, true)
        global.youtubePlayer.playVideo();
      } else if (global.currentlyPlaying[0] === "Spotify") {
        global.currentContentPosition = time;
        // TODO: FINISH SEEK LOGIC HERE
        
        seek(time*1000, global.spotifyAccessToken);
        play(global.spotifyAccessToken)
      }
      global.isContentPlaying = true;

      this.context.updateSessionQueue(global.sessionQueue);
    } else {
      console.log("Nothing is currently playing.")
    }


  }

  onSlidingStart = () => {
    console.log("Sliding Start")
    // Pause content while seeking
    global.isContentPlaying = false;
    if (global.currentlyPlaying !== "") {
    
      if (global.currentlyPlaying[0] === "Youtube") {
        global.youtubePlayer.pauseVideo();

      } else if (global.currentlyPlaying[0] === "Spotify") {
        pause(global.spotifyAccessToken)
      }

    } 
    // Updates State of Session
    this.context.updateSessionQueue(global.sessionQueue);
  }

  queueButtonClicked = () => {
    let element = document.getElementById('editQueueButton');
    
    if (!this.state.isEditingQueue) {
      
      ReactDOM.findDOMNode(element).style.color = "red";
      // ReactDOM.findDOMNode(element).style.text = "Done Editing";
    } else {
      ReactDOM.findDOMNode(element).style.color = "white";
      // ReactDOM.findDOMNode(element).style.text = "Edit Queue";
    }
    
    this.setState({
      editQueueText: !this.state.isEditingQueue ? "Done Editing" : "Edit Queue",
      isEditingQueue: !this.state.isEditingQueue 
      
    })

    this.props.editQueue();
    
}

  render() {

    return (
      <SessionContext.Consumer>
        {({ isContentPlaying }) => (
          <div id={this.props.deviceType === "Web" ? "controllerDiv" : "controllerDivMobile"}>

            <img
              className={global.currentlyPlaying === ""
                  ? ""
                  : global.currentlyPlaying[0] === "Youtube"
                  ? "currentTrackPicYT"
                  : "currentTrackPicSpotify"}
              src={ // Change img path based on youtube/spotify
                global.currentlyPlaying === ""
                  ? ""
                  : global.currentlyPlaying[0] === "Youtube"
                  ? global.currentlyPlaying[1].snippet.thumbnails.high.url
                  : global.currentlyPlaying[1].album.images[0].url
              }
              alt=""></img>
            <div className={this.props.deviceType === "Web" ? "controllerButtonsWeb" : "controllerButtonsMobile"}>
              <div id="buttonBox">
                <img
                src={require("../../resources/images/RestartButton.png")}
                id="restartButton"
                onClick={this.restartPressed}
                alt='Restart Button'></img>
                </div>
              <div id="buttonBox">
                <img
                  id="playButton"
                  src={ global.isContentPlaying
                      ? 
                        require("../../resources/images/PauseButton.png")
                      : 
                        require("../../resources/images/PlayButton.png")}
                  style={{
                    
                    left: global.isContentPlaying ? "-5px" : "",
                    width: global.isContentPlaying ? "5.4vh" : "4.8vh"
                  }}
                  onClick={this.playButtonPress}
                  alt='Play Button'></img>
                </div>
                <div id="buttonBox">
                <img
                  src={require("../../resources/images/SkipButton.png")}
                  id="skipButton"
                  onClick={this.skipPressed}
                  alt='Skip Button'></img>
                </div>
            </div>
            <div className="songText">
              <div className="TitleandPlatform">
                <p id="songTitle">
                  {global.currentlyPlaying === ""
                    ? "Nothings playing!"
                    : global.currentlyPlaying[0] === "Youtube"
                    ? formatYTTitle(global.currentlyPlaying[1].snippet.title)
                    : global.currentlyPlaying[1].name}
                </p>
                {global.currentlyPlaying[0] === "Youtube" ? (
                  <img src={youtubeIcon} alt="" className="youtubeIconCP"></img>
                ) : global.currentlyPlaying[0] === "Spotify" ? (
                  <img src={spotifyIcon} alt="" className="spotifyIconCP"></img>
                ) : (
                  <div className="placeHolderIcon"></div>
                )}
              </div>

              <p id="songArtist">
                {global.currentlyPlaying === ""
                  ? "Search a song or choose from your Library"
                  : global.currentlyPlaying[0] === "Youtube"
                  ? global.currentlyPlaying[1].snippet.channelTitle
                  : this.formatArtistString(global.currentlyPlaying[1].artists)}
              </p>
            </div>
            <div className={this.props.deviceType === "Web" ? "seekbarDivWeb" : "seekbarDivMobile"}>

              <SeekBar
                onSeek={this.seek.bind(this)}
                trackLength={this.getCurrentTrackLength()}
                onSlidingStart={() => this.onSlidingStart()} 
                currentPosition={Math.trunc(global.currentContentPosition)} />
            </div>
            <p className="upNextText">Up Next:</p>
            <button className="editQueueButton" id="editQueueButton" onClick={this.queueButtonClicked}>{this.state.editQueueText}</button>
          </div>
        )}
      </SessionContext.Consumer>
    );
  }
}
SessionController.contextType = SessionContext;

export default SessionController;
