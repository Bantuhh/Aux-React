import React, { Component } from "react";

import { addSongToQueue } from "../../utils/queueInterface";

import { viewOnSpotify } from "../../utils/spotifyInterface";

import "../../styles/SearchWeb.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import SearchResults from "./searchResults";

import SearchIcon from "../../resources/images/SearchIcon.png";

import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class SearchWeb extends Component {
  state = {
    trackSearchResults: global.spotifyTrackSearchResults,
    spotifySearch:
      Object.keys(global.spotifyTrackSearchResults).length == 0 ? false : true,
    lastSpotifySearchQuery: global.lastSpotifySearchQuery,
    songOptionsSelected: false,
    selectedSongInfo: "HI",
    selectedPlatform: "Spotify",
  };

  createNotification = (type) => {
    console.log("GOT TO CREATE NOTIFICATION");
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        break;
      case "success":
        NotificationManager.success("Success message", "Title here");
        break;
      case "warning":
        NotificationManager.warning(
          "Warning message",
          "Close after 3000ms",
          3000
        );
        break;
      case "error":
        NotificationManager.error(
          "Make sure you are logged into your Spotify",
          "Error!",
          5000,
          () => {
            //alert("callback");
          }
        );
        break;
    }
    return () => {};
  };

  spotifySearchTrack = () => {
    this.setState({
      selectedPlatform: "Spotify",
    });

    var query = document.getElementById("searchQuery").value;
    spotifyWebApi.searchTracks(query).then(
      (response) => {
        console.log(response);
        this.setState({
          trackSearchResults: response.tracks.items,
          spotifySearch: true,
        });

        global.spotifyTrackSearchResults = response.tracks.items;
        global.lastSpotifySearchQuery = query;
      },
      (reason) => {
        console.log("GOT TO ERROR");
        this.createNotification("error");
        console.error(reason); // Error!
      }
    );
  };

  showSongOptions = (songInfo) => {
    console.log(songInfo);

    this.setState({
      songOptionsSelected: true,
      selectedSongInfo: songInfo,
    });
  };

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
    return (
      <div className="searchFlex">
        <div className="searchMiddle">
          <div className="searchQueryDiv">
            <div className="searchInputDiv">
              <img className="searchIcon" src={SearchIcon} alt=""></img>
              <input
                type="text"
                id="searchQuery"
                placeholder={
                  this.state.lastSpotifySearchQuery === ""
                    ? "Search a song or artist.."
                    : this.state.lastSpotifySearchQuery
                }></input>
            </div>
            <div className="searchButtonDiv">
              <button
                id="spotifySearchBtn"
                onClick={this.spotifySearchTrack}></button>
            </div>
            <p id="searchDivHeader">
              {this.state.spotifySearch
                ? "Spotify Search"
                : "Enter a query and click desired platform to search.."}
            </p>
          </div>
          <SearchResults
            trackSearchResults={this.state.trackSearchResults}
            showSongOptions={this.showSongOptions}></SearchResults>
          <NotificationContainer />
        </div>
        {/* If Song Options was selected, show selected song info on right side */}
        {this.state.songOptionsSelected ? (
          <div className="searchRight">
            <img
              className="songOptionsAlbumImg"
              src={this.state.selectedSongInfo.album.images[0].url}
              alt=""></img>

            <p className="songOptionsTitle">
              {this.state.selectedSongInfo.name}
            </p>
            <p className="songOptionsArtist">
              {this.formatArtistString(this.state.selectedSongInfo.artists)}
            </p>
            <div id="firstSeparatorLine"></div>
            <button
              id="addToQueueBtn"
              onClick={() =>
                addSongToQueue(
                  this.state.selectedPlatform,
                  this.state.selectedSongInfo
                )
              }></button>
            <div id="secondSeparatorLine"></div>
            <button
              id="viewOnSpotifyBtn"
              onClick={() =>
                viewOnSpotify(this.state.selectedSongInfo)
              }></button>
          </div>
        ) : (
          // If nothing selected, show nothing on right side
          <div className="searchRight"></div>
        )}
      </div>
    );
  }
}

export default SearchWeb;
