import React, { Component } from "react";

import "../../styles/SessionController.css";

import { SessionContext } from "../../session-context";

import { play, pause, playURI } from "../../utils/spotifyInterface";
import { formatYTTitle } from "../../utils/youtubeInterface";

import { popQueue } from "../../utils/queueInterface";

import spotifyIcon from "../../resources/images/Spotify.png";
import youtubeIcon from "../../resources/images/Youtube.png";

class SessionController extends Component {
  state = {
    isPlaying: global.isContentPlaying,
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
      global.youtubePlayer.loadVideoById(upNext[1].id.videoId, 0);
    }

    global.isContentPlaying = true;
    global.currentlyPlaying = upNext;

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

  render() {
    return (
      <SessionContext.Consumer>
        {({ isContentPlaying }) => (
          <div className="controllerDiv">
            <img
              className="currentTrackPic"
              src={
                global.currentlyPlaying === ""
                  ? ""
                  : global.currentlyPlaying[0] === "Youtube"
                  ? global.currentlyPlaying[1].snippet.thumbnails.high.url
                  : global.currentlyPlaying[1].album.images[0].url
              }
              alt=""></img>
            <div className="controllerButtons">
              <button
                className="restartButton"
                onClick={this.restartPressed}></button>
              <button
                className="playButton"
                style={{
                  background: global.isContentPlaying
                    ? "url(" +
                      require("../../resources/images/PauseButton.png") +
                      ")"
                    : "url(" +
                      require("../../resources/images/PlayButton.png") +
                      ")",
                  left: global.isContentPlaying ? "-5px" : "",
                }}
                onClick={this.playButtonPress}></button>
              <button
                className="skipButton"
                onClick={this.skipPressed}></button>
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
                  ""
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
          </div>
        )}
      </SessionContext.Consumer>
    );
  }
}
SessionController.contextType = SessionContext;

export default SessionController;
