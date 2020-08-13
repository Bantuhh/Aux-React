import React, { Component } from "react";

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
            trackSearchResults={this.state.trackSearchResults}></SearchResults>
          <NotificationContainer />
        </div>
        <div className="searchRight"></div>
      </div>
    );
  }
}

export default SearchWeb;
