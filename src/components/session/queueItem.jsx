import React, { Component } from "react";

import "./queueItem.css";

import { formatYTTitle } from "../../utils/youtubeInterface";

import spotifyIcon from "../../resources/images/Spotify.png";
import youtubeIcon from "../../resources/images/Youtube.png";

class QueueItem extends Component {
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
      <div className="queueItemDiv">
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
        <div className="songOptionsDiv">
          <button className="songOptions" onClick={() => this.props.showContentOptions()}></button>
        </div>
      </div>
    );
  }
}

export default QueueItem;
