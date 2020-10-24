import React, { Component } from "react";
import { SessionContext } from "../../session-context";

import { addSongToQueue } from "../../utils/queueInterface";

import { viewOnSpotify, playURI, pause } from "../../utils/spotifyInterface";

import { viewOnYoutube } from "../../utils/youtubeInterface";

import YTSearch from "youtube-api-search";

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

const YOUTUBE_API_KEY = "AIzaSyB3FeQ_UyFnXjkDV9V62tca3eLs4D0NQjQ";

class SearchWeb extends Component {
  state = {
    trackSearchResults: global.spotifyTrackSearchResults,
    youtubeSearchResults: global.youtubeSearchResults,
    spotifySearch:
      Object.keys(global.spotifyTrackSearchResults).length === 0 ? false : true,
    youtubeSearch: false,
    lastSpotifySearchQuery: global.lastSpotifySearchQuery,
    songOptionsSelected: false,
    selectedContentInfo: "HI",
    selectedPlatform: "Spotify",
  };

  createNotification = (type) => {
    console.log("GOT TO CREATE NOTIFICATION");
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        break;
      case "success":
        NotificationManager.success(
          "I knew you could do it.",
          "Song added to queue",
          1500
        );
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
      songOptionsSelected: false,
    });

    var query = document.getElementById("searchQuery").value;

    // Don't search if query is empty
    if (query === "") {
      return;
    }

    spotifyWebApi.searchTracks(query).then(
      (response) => {
        console.log(response);
        this.setState({
          trackSearchResults: response.tracks.items,
          spotifySearch: true,
          youtubeSearch: false,
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

  // Add Spotify song to queue and send notification
  addSongToQueue = (platform, songInfo) => {
    addSongToQueue(platform, songInfo);
    this.createNotification("success");
  };

  showContentOptions = (songInfo) => {
    console.log(songInfo);

    this.setState({
      songOptionsSelected: true,
      selectedContentInfo: songInfo,
    });
  };

  playSongNow = (songInfo) => {
    if (this.state.selectedPlatform === "Youtube") {
      //Implement logic of playing youtube content immediately
      pause(global.spotifyAccessToken);
      this.context.loadYTVideo(songInfo.id.videoId);
    } else {
      const songURI = songInfo["uri"];
      global.youtubePlayer.pauseVideo();
      playURI(songURI, global.spotifyAccessToken);
    }

    global.isContentPlaying = true;

    // Set song as currently playing
    global.currentlyPlaying = [this.state.selectedPlatform, songInfo];

    this.context.updateSessionQueue(global.sessionQueue);
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

  // Youtube API
  youtubeSearch = () => {
    var query = document.getElementById("searchQuery").value;

    // Don't search if query is empty
    if (query === "") {
      return;
    }

    YTSearch({ key: YOUTUBE_API_KEY, term: query }, (videos) => {
      //do something with videos!
      console.log(videos);

      this.setState({
        selectedPlatform: "Youtube",
        youtubeSearchResults: videos,
        songOptionsSelected: false,
        youtubeSearch: true,
        spotifySearch: false,
      });
    });
  };

  addYTContentToQueue = (platform, songInfo) => {
    console.log("addYTContentToQueue");
    this.createNotification("success");

    var currentSong = [platform, songInfo];

    // If no songs currently in queue, add song to queue and skip to song
    if (
      !global.isContentPlaying &
      (global.sessionQueue.length === 0) &
      (global.currentlyPlaying === "")
    ) {
      if (currentSong !== "None") {
        // Check the platform of the song
        if (currentSong[0] === "Youtube") {
          this.context.loadYTVideo(songInfo.id.videoId);

          global.isContentPlaying = true;

          // Set song as currently playing
          global.currentlyPlaying = currentSong;
        }
      }
    } else {
      // Push song to queue
      global.sessionQueue.push(currentSong);

      console.log("currentSong", currentSong);

      console.log("Added Song to Queue");
    }
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
              <button
                id="youtubeSearchBtn"
                onClick={this.youtubeSearch}></button>
            </div>
            <p id="searchDivHeader">
              {this.state.spotifySearch
                ? "Spotify Search"
                : this.state.youtubeSearch
                ? "Youtube Search"
                : "Enter a query and click desired platform to search.."}
            </p>
          </div>
          <SearchResults
            trackSearchResults={this.state.trackSearchResults}
            youtubeSearchResults={this.state.youtubeSearchResults}
            playSongNow={this.playSongNow}
            showContentOptions={this.showContentOptions}
            addSongToQueue={this.addSongToQueue}
            selectedPlatform={this.state.selectedPlatform}></SearchResults>
          <NotificationContainer />
        </div>
        {/* If Song Options was selected, show selected song info on right side */}
        {
          this.state.songOptionsSelected &
          (this.state.selectedPlatform === "Spotify") ? (
            <div className="searchRight">
              <img
                className="songOptionsAlbumImg"
                src={this.state.selectedContentInfo.album.images[0].url}
                alt=""></img>

              <p className="songOptionsTitle">
                {this.state.selectedContentInfo.name}
              </p>
              <p className="songOptionsArtist">
                {this.formatArtistString(
                  this.state.selectedContentInfo.artists
                )}
              </p>
              <div id="firstSeparatorLine"></div>
              <button
                id="addToQueueBtn"
                onClick={() =>
                  this.addSongToQueue(
                    this.state.selectedPlatform,
                    this.state.selectedContentInfo
                  )
                }></button>
              <div id="secondSeparatorLine"></div>
              <button
                id="viewOnSpotifyBtn"
                onClick={() =>
                  viewOnSpotify(this.state.selectedContentInfo)
                }></button>
            </div>
          ) : this.state.songOptionsSelected &
            (this.state.selectedPlatform === "Youtube") ? (
            <div className="searchRight">
              <img
                className="songOptionsAlbumImg"
                src={
                  this.state.selectedContentInfo.snippet.thumbnails.default.url
                }
                alt=""></img>

              <p className="songOptionsTitle">
                {this.state.selectedContentInfo.snippet.title}
              </p>
              <p className="songOptionsArtist">
                {this.state.selectedContentInfo.snippet.channelTitle}
              </p>
              <div id="firstSeparatorLine"></div>
              <button
                id="addToQueueBtn"
                onClick={() =>
                  this.addYTContentToQueue(
                    this.state.selectedPlatform,
                    this.state.selectedContentInfo
                  )
                }></button>
              <div id="secondSeparatorLine"></div>
              <button
                id="viewOnYoutubeBtn"
                onClick={() =>
                  viewOnYoutube(this.state.selectedContentInfo)
                }></button>
            </div>
          ) : (
            <div className="searchRight"></div>
          )
          // If nothing selected, show nothing on right side
        }
      </div>
    );
  }
}
SearchWeb.contextType = SessionContext;

export default SearchWeb;
