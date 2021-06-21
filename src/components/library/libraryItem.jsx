import React, { Component } from "react";

import "./libraryItem.css";

import albumPlaceholderImg from "../../resources/images/AlbumImgPlaceholder.png";

class LibraryItem extends Component {
  state = {};
  render() {
    var { songInfo } = this.props;
    songInfo = songInfo.track;

    var albumImgPath = ''
    if (songInfo.album.images.length === 0) {
      albumImgPath = albumPlaceholderImg
    } else {
      albumImgPath = songInfo.album.images[2].url;
    } 

    var artistString = "";
    var numArtists = 0;

    for (var key in Object.keys(songInfo.artists)) {
      var artist = songInfo.artists[key];

      if (numArtists > 0) {
        artistString = artistString + ", " + artist.name;
      } else {
        artistString = artist.name;
      }
      numArtists += 1;
    }

    return (
      <div className="libraryItemDiv">
        <button
          className="playNow"
          onClick={() => this.props.playSongNow()}></button>
        <img className="albumImg" src={albumImgPath} alt=""></img>
        <div className="songInfoDiv">
          <p className="songTitle">{songInfo.name}</p>
          <p className="songArtist">{artistString}</p>
        </div>
        <div className="queueButtonDiv">
          <button
            className="queueButton"
            onClick={() => this.props.addSongToQueue()}></button>
        </div>
        <div className="songOptionsDiv">
          <button
            className="songOptions"
            onClick={() => this.props.showSongOptions()}></button>
        </div>
      </div>
    );
  }
}

export default LibraryItem;
