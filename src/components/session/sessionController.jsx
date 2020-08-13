import React, { Component } from "react";

import "../../styles/SessionController.css";

class SessionController extends Component {
  state = {
    isPlaying: false,
    currentTrack: {
      songTitle: "Ghost Voices (Hex Cougar Flip)",
      artist: "Hex Cougar",
      albumImgURL: require("../../resources/images/GhostVoicesHex.png"),
    },
  };

  playButtonPress = () => {
    if (this.state.isPlaying) {
      this.setState({ isPlaying: false });
      console.log(this.state.isPlaying);
    } else {
      this.setState({ isPlaying: true });
      console.log(this.state.isPlaying);
    }
  };

  render() {
    return (
      <div className="controllerDiv">
        <img
          className="currentTrackPic"
          src={this.state.currentTrack.albumImgURL}
          alt=""></img>
        <div className="controllerButtons">
          <button className="restartButton"></button>
          <button
            className="playButton"
            style={{
              background: this.state.isPlaying
                ? "url(" +
                  require("../../resources/images/PauseButton.png") +
                  ")"
                : "url(" +
                  require("../../resources/images/PlayButton.png") +
                  ")",
              left: this.state.isPlaying ? "-5px" : "",
            }}
            onClick={this.playButtonPress}></button>
          <button className="skipButton"></button>
        </div>
        <div className="songText">
          <p id="songTitle">{this.state.currentTrack.songTitle}</p>
          <p id="songArtist">{this.state.currentTrack.artist}</p>
        </div>
      </div>
    );
  }
}

export default SessionController;
