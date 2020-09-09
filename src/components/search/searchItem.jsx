import React, { Component } from "react";

import "../../styles/searchItem.css";

class SearchItem extends Component {
  state = {};
  render() {
    const { songInfo } = this.props;
    const albumImgPath = songInfo.album.images[2].url;

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
      <div className="searchItemDiv">
        <img className="albumImg" src={albumImgPath} alt=""></img>
        <div className="songInfoDiv">
          <p className="songTitle">{songInfo.name}</p>
          <p className="songArtist">{artistString}</p>
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

export default SearchItem;
