import React, { Component } from "react";

import "../../styles/SessionWeb.css";

import SessionController from "./sessionController";
import SessionQueue from "./sessionQueue";
import SessionRight from "./sessionRight";

class SessionWeb extends Component {
  state = {
    songOptionsSelected: false,
    selectedContentInfo: "",
    selectedPlatform: "Spotify",
    isEditingQueue: false
  };

  updateSessionState = () => {
    this.setState({});
  };

  showContentOptions = (songInfo) => {
    console.log(songInfo);

    this.setState({
      songOptionsSelected: true,
      selectedContentInfo: songInfo[1],
      selectedPlatform: songInfo[0]
    });
  }

  editQueue = () => {
    this.setState({
      isEditingQueue: !this.state.isEditingQueue
    })
  };

  render() {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <div className="sessionFlex">
          <div className="sessionMiddle">
            <SessionController editQueue={this.editQueue}></SessionController>
            <SessionQueue isEditingQueue={this.state.isEditingQueue} showContentOptions={this.showContentOptions}></SessionQueue>
          </div>
          <SessionRight songOptionsSelected={this.state.songOptionsSelected} selectedPlatform={this.state.selectedPlatform} selectedContentInfo={this.state.selectedContentInfo}></SessionRight>
          
        </div>
      </React.Suspense>
    );
  }
}

export default SessionWeb;
