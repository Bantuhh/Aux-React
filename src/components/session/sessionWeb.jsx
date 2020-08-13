import React, { Component, useEffect } from "react";

import "../../styles/SessionWeb.css";

import SessionController from "./sessionController";
import SessionQueue from "./sessionQueue";

import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class SessionWeb extends Component {
  state = {};

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
