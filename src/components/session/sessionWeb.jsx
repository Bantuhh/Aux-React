import React, { Component, useEffect } from "react";

import {
  viewOnSpotify,
  queueSpotifySong,
  skipSongSpotify,
} from "../../utils/spotifyInterface";

import "../../styles/SessionWeb.css";

import SessionController from "./sessionController";
import SessionQueue from "./sessionQueue";

import SpotifyPlayer from "react-spotify-web-playback";

class SessionWeb extends Component {
  state = {
    currentSong: [],
    queue: [],
    spotifyURIQueue: ["spotify:track:2aPTvyE09vUCRwVvj0I8WK"],
    timeToSkip: true,
    currentSongsPlatform: "Spotify",
  };

  popQueue = (queue) => {
    if (queue.length == 0) {
      return ["None", []];
    }

    var currentSong = queue.pop(0);

    return [currentSong, queue];
  };

  readGlobalQueue = () => {
    if (global.sessionQueue.length === 0) {
      return;
    } else if (global.isContentPlaying) {
    }
  };

  checkPlayerStatus = (state) => {
    console.log("Player Status: ", state);
  };

  render() {
    // TODO: Figure out how to start songs and add to queue, song skips everytime you go to session tab
    // if (this.state.timeToSkip) {
    //   // pop queue to get current song and new queue
    //   var queuePop = this.popQueue(global.sessionQueue);

    //   var currentSong = queuePop[0];

    //   var newQueue = queuePop[1];

    //   console.log("Current Song:", currentSong);
    //   console.log("New Queue:", newQueue);

    //   // Check if there are songs in the queue
    //   if (currentSong != "None") {
    //     // Check the platform of the song
    //     if (currentSong[0] == "Spotify") {
    //       var songURI = currentSong[1]["uri"];
    //       console.log("songURI", songURI);

    //       queueSpotifySong(songURI, global.spotifyAccessToken);
    //       skipSongSpotify(global.spotifyAccessToken);

    //       global.isContentPlaying = true;
    //     }
    //   } else {
    //     global.isContentPlaying = false;
    //   }

    //   global.sessionQueue = newQueue;
    //   global.currentlyPlaying = currentSong;
    // }

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
