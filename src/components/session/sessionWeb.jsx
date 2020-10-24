import React, { Component } from "react";

import "../../styles/SessionWeb.css";

import SessionController from "./sessionController";
import SessionQueue from "./sessionQueue";

class SessionWeb extends Component {
  state = {
    currentSong: [],
    queue: [],
    spotifyURIQueue: ["spotify:track:2aPTvyE09vUCRwVvj0I8WK"],
    timeToSkip: true,
    currentSongsPlatform: "Spotify",
  };

  updateSessionState = () => {
    this.setState({});
  };

  render() {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <div className="sessionFlex">
          <div className="sessionMiddle">
            <SessionController></SessionController>
            <SessionQueue></SessionQueue>
          </div>
          <div className="sessionRight"></div>
        </div>
      </React.Suspense>
    );
  }
}

export default SessionWeb;
