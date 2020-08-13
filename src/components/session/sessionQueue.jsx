import React, { Component } from "react";

import "../../styles/SessionQueue.css";

import QueueItem from "./queueItem";

class SessionQueue extends Component {
  state = {
    queue: [
      {
        songTitle: "Ghost Voices",
        artist: "Virtual Self",
        albumImgURL: require("../../resources/images/GhostVoices.png"),
      },
      {
        songTitle: "Dosas and Mimosas",
        artist: "Cherub",
        albumImgURL: require("../../resources/images/DosasandMimosas.png"),
      },
    ],
  };
  render() {
    return (
      <div className="queueDiv">
        {this.state.queue.map((item) => (
          <QueueItem songInfo={item} />
        ))}
      </div>
    );
  }
}

export default SessionQueue;
