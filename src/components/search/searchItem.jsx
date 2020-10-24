import React, { Component } from "react";

import "../../styles/searchItem.css";
import { formatYTTitle } from "../../utils/youtubeInterface";

class SearchItem extends Component {
  state = {};
  render() {
    const { songInfo, vidInfo, selectedPlatform } = this.props;

    var vidThumbnailPath = "";

    var albumImgPath = "";
    var artistString = "";
    var numArtists = 0;

    // Load fields depending on selected platform
    if (selectedPlatform === "Youtube") {
      vidThumbnailPath = vidInfo.snippet.thumbnails.default.url;
    } else if (selectedPlatform === "Spotify") {
      albumImgPath = songInfo.album.images[2].url;

      for (var key in Object.keys(songInfo.artists)) {
        var artist = songInfo.artists[key];

        if (numArtists > 0) {
          artistString = artistString + ", " + artist.name;
        } else {
          artistString = artist.name;
        }
        numArtists += 1;
      }
    }

    return (
      <div className="searchItemDiv">
        {selectedPlatform === "Youtube" ? (
          <div className="searchItemDivInner">
            <button
              className="playNow"
              onClick={() => this.props.playSongNow()}></button>
            <img className="albumImg" src={vidThumbnailPath} alt=""></img>
            <div className="songInfoDiv">
              <p className="songTitle">
                {formatYTTitle(vidInfo.snippet.title)}
              </p>
              <p className="songArtist">{vidInfo.snippet.channelTitle}</p>
            </div>
            <div className="queueButtonDiv">
              <button
                className="queueButton"
                onClick={() => this.props.addSongToQueue()}></button>
            </div>
            <div className="songOptionsDiv">
              <button
                className="songOptions"
                onClick={() => this.props.showContentOptions()}></button>
            </div>
          </div>
        ) : (
          <div className="searchItemDivInner">
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
                onClick={() => this.props.showContentOptions()}></button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SearchItem;
