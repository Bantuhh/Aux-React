import React, { Component } from "react";

import "./queueItem.css";

import { formatYTTitle } from "../../utils/youtubeInterface";

import { formatArtistString } from "../../utils/spotifyInterface";

import { useDrag, useDrop } from "react-dnd";

import spotifyIcon from "../../resources/images/Spotify.png";
import youtubeIcon from "../../resources/images/Youtube.png";
import reorderIcon from "../../resources/images/ReorderIcon.png"

export class EditingQueueItem extends Component {
  state = {};

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
      artist = formatArtistString(trackInfo.artists);
    }

    return (
      <div className="queueItemDiv" draggable={true} onDragOver={(e) => this.onDragOver(e, songInfo)} onDragStart={(e) => this.onDragStart(e, songInfo)}>
        <img className="albumImg" src={contentImgPath} alt=""></img>
        <div className="songInfoDiv">
          <div className={platform === "Youtube" ? "titleAndIconYT" : 'titleAndIconSpotify'}>
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

export const EditingQueueItemTouchable = (props) => {

  const { songInfo } = props;
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
    artist = formatArtistString(trackInfo.artists);
  }

  // var nothingDragging = true;

  const[{ isDragging }, drag] = useDrag({
    item: { name: 'Any custom name', type: 'Queue Item'},
    end: (item, monitor) => {
      var index = global.sessionQueue.indexOf(songInfo);
      global.draggedQueueItemIndex = index;
      console.log('onDragStart, index:', index);  

      props.onDrop()
      // return {somethingDragging: false};
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  const [, drop] = useDrop({
    accept: 'Queue Item',
    drop: () => {
      var index = global.sessionQueue.indexOf(songInfo);
      global.draggedOntoQueueItemIndex = index;
      console.log('onDragOver, index:', index);  
    },
    collect: (monitor) => {
      
    }
  });

  return (
      <div className="queueItemDiv" ref={drop} style={{ opacity }} >
        <img className="albumImg" src={contentImgPath} alt=""></img>
        <div className="songInfoDiv">
          <div className={platform === "Youtube" ? "titleAndIconYT" : 'titleAndIconSpotify'}>
            <p className="songTitle">{title}</p>
            {platform === "Youtube" ? (
              <img src={youtubeIcon} alt="" className="youtubeIcon"></img>
            ) : (
              <img src={spotifyIcon} alt="" className="spotifyIcon"></img>
            )}
          </div>
          <p className="songArtist">{artist}</p>
        </div>
        <div className="reorderIconDiv" ref={drag}>
            <img src={reorderIcon} alt="" className="reorderIcon"></img>
        </div>
        <div className="removeSongDiv">
          <button className="removeSong" onClick={() => props.removeSong()}></button>
        </div>
      </div>
  );
}
