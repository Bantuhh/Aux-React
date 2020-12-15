import React, { Component } from "react";

import "../../styles/queueItem.css";

import { formatYTTitle } from "../../utils/youtubeInterface";

import spotifyIcon from "../../resources/images/Spotify.png";
import youtubeIcon from "../../resources/images/Youtube.png";
import reorderIcon from "../../resources/images/ReorderIcon.png"

class EditingQueueItem extends Component {
  state = {};

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

  onDragOver = (e, songInfo) => {
    // console.log(e)
    e.preventDefault();
    var index = global.sessionQueue.indexOf(songInfo);
    global.draggedOntoQueueItemIndex = index;
    // console.log('onDragOver');
  }

  onDragStart = (e, songInfo) => {
    // e.dataTransfer.setData('draggedSongIndex', JSON.stringify(songInfo));
    var index = global.sessionQueue.indexOf(songInfo);
    global.draggedQueueItemIndex = index;
    console.log('onDragStart, index:', index);
  }

  render() {
    const { songInfo } = this.props;
    const platform = songInfo[0];
    const trackInfo = songInfo[1];

    var contentImgPath = "";
    var title = "";
    var artist = "";

    if (platform === "Youtube") {
      contentImgPath = trackInfo.snippet.thumbnails.default.url;
      title = formatYTTitle(trackInfo.snippet.title);
      artist = trackInfo.snippet.channelTitle;
    } else if (platform === "Spotify") {
      contentImgPath = trackInfo.album.images[0].url;
      title = trackInfo.name;
      artist = this.formatArtistString(trackInfo.artists);
    }

    return (
      <div className="queueItemDiv" draggable={true} onDragOver={(e) => this.onDragOver(e, songInfo)} onDragStart={(e) => this.onDragStart(e, songInfo)}>
        <img className="albumImg" src={contentImgPath} alt=""></img>
        <div className="songInfoDiv">
          <div className="titleAndIcon">
            <p className="songTitle">{title}</p>
            {platform === "Youtube" ? (
              <img src={youtubeIcon} alt="" className="youtubeIcon"></img>
            ) : (
              <img src={spotifyIcon} alt="" className="spotifyIcon"></img>
            )}
          </div>
          <p className="songArtist">{artist}</p>
        </div>
        <div className="reorderIconDiv">
            <img src={reorderIcon} alt="" className="reorderIcon"></img>
        </div>
        <div className="removeSongDiv">
          <button className="removeSong" onClick={() => this.props.removeSong()}></button>
        </div>
      </div>
    );
  }
}

export default EditingQueueItem;
