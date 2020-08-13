import React, { Component } from "react";

import "../../styles/queueItem.css";
//"../../resources/images/GhostVoices.png"
class QueueItem extends Component {
  state = {};
  render() {
    const { songInfo } = this.props;
    const albumImgPath = songInfo.albumImgURL;
    const imgPath = albumImgPath;
    return (
      <div className="queueItemDiv">
        <img className="albumImg" src={imgPath} alt=""></img>
        <div className="songInfoDiv">
          <p className="songTitle">{songInfo.songTitle}</p>
          <p className="songArtist">{songInfo.artist}</p>
        </div>
        <div className="songOptionsDiv">
          <button className="songOptions"></button>
        </div>
      </div>
    );
  }
}

export default QueueItem;
