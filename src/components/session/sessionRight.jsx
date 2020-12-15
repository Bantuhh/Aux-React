import React, { Component } from 'react';
import { addSongToQueue } from "../../utils/queueInterface";
import { viewOnYoutube } from "../../utils/youtubeInterface";
import { viewOnSpotify } from "../../utils/spotifyInterface";
import {
    NotificationContainer,
    NotificationManager,
  } from "react-notifications";
  import "react-notifications/lib/notifications.css";

class SessionRight extends Component {

    createNotification = (type) => {
        console.log("GOT TO CREATE NOTIFICATION");
        switch (type) {
          case "info":
            NotificationManager.info("Info message");
            break;
          case "success":
            NotificationManager.success(
              "I knew you could do it.",
              "Song added to queue",
              1500
            );
            break;
          case "warning":
            NotificationManager.warning(
              "Warning message",
              "Close after 3000ms",
              3000
            );
            break;
          case "error":
            NotificationManager.error(
              "Make sure you are logged into your Spotify",
              "Error!",
              5000,
              () => {
                //alert("callback");
              }
            );
            break;
        }
        return () => {};
      };

    // Add Spotify song to queue and send notification
    addSongToQueue = (platform, songInfo) => {
        addSongToQueue(platform, songInfo);
        this.createNotification("success");
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
        const { songOptionsSelected, selectedPlatform, selectedContentInfo } = this.props;
        return (
            <div className="sessionRightContainer">
            {/* If Song Options was selected, show selected song info on right side */}
            {songOptionsSelected ? (
              <div className="sessionRight">
                <img
                  className="songOptionsAlbumImg"
                  src={(selectedPlatform === "Spotify") ? selectedContentInfo.album.images[0].url : selectedContentInfo.snippet.thumbnails.default.url}
                  alt=""></img>
  
                <p className="songOptionsTitle">
                  {(selectedPlatform === "Spotify") ? selectedContentInfo.name : selectedContentInfo.snippet.title}
                </p>
                <p className="songOptionsArtist">
                  {(selectedPlatform === "Spotify") ? this.formatArtistString(
                    selectedContentInfo.artists
                  ) : selectedContentInfo.snippet.channelTitle}
                </p>
                <div id="firstSeparatorLine"></div>
                <button
                  id="addToQueueBtn"
                  onClick={() =>
                    this.addSongToQueue(
                      selectedPlatform,
                      selectedContentInfo
                    )
                  }></button>
                <div id="secondSeparatorLine"></div>
                <button
                  id={(selectedPlatform === "Spotify") ? "viewOnSpotifyBtn" : "viewOnYoutubeBtn"}
                  onClick={(selectedPlatform === "Spotify") ? () =>
                    viewOnSpotify(selectedContentInfo) : () =>
                    viewOnYoutube(selectedContentInfo)
                  }></button>
              </div>
              ) : (
              <div className="sessionRight"></div>
            )
            // If nothing selected, show nothing on right side
            }
            <NotificationContainer />
            </div>
            
        );
    }
}
export default SessionRight;