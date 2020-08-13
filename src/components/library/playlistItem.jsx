import React, { Component } from "react";

import "../../styles/PlaylistItem.css";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

class PlaylistItem extends Component {
  state = {
    playlistTracks: {},
  };

  createNotification = (type) => {
    console.log("GOT TO CREATE NOTIFICATION");
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        break;
      case "success":
        NotificationManager.success("Success message", "Title here");
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

  render() {
    var { playlistInfo } = this.props;

    const playlistImgPath = playlistInfo.images[0].url;

    return (
      <div className="playlistItemDiv">
        <img className="playlistImg" src={playlistImgPath} alt=""></img>
        <div className="playlistInfoDiv">
          <p className="playlistTitle">{playlistInfo.name}</p>
          <p className="numTracks">{playlistInfo.tracks.total + " songs"}</p>
        </div>
        <div className="playlistOptionsDiv">
          <button
            className="playlistOptions"
            onClick={() => this.props.showPlaylist()}></button>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default PlaylistItem;
