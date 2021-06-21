import React, { Component } from "react";
import "./SessionMobile.css";

import SessionController from "./sessionController";
import SessionQueue from "./sessionQueue";


class SessionMobile extends Component {
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
    return <React.Suspense fallback={<div>Loading...</div>}>
    <div id="sessionFlexMobile">
        <SessionController editQueue={this.editQueue} deviceType="Mobile"></SessionController>
        <SessionQueue isEditingQueue={this.state.isEditingQueue} deviceType="Mobile" showContentOptions={this.showContentOptions}></SessionQueue>
      {/* <div className="sessionMiddle">
        
      </div> */}
      {/* <SessionRight songOptionsSelected={this.state.songOptionsSelected} selectedPlatform={this.state.selectedPlatform} selectedContentInfo={this.state.selectedContentInfo}></SessionRight> */}
      
    </div>
  </React.Suspense>;
  }
}

export default SessionMobile;
