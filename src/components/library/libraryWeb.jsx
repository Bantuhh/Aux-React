import React, { Component } from "react";
import { SessionContext } from "../../session-context";

import { addSongToQueue, addPlaylistToQueue } from "../../utils/queueInterface";

import { viewOnSpotify, playURI } from "../../utils/spotifyInterface";

import "../../styles/LibraryWeb.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import LibraryResults from "./libraryResults";

import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class LibraryWeb extends Component {
  state = {
    spotifyFavoritesResults: global.spotifyFavoritesResults,
    spoitfyPlaylistsResults: global.spoitfyPlaylistsResults,
    selectedTab: "Favorites",
    playlistSelected: false,
    selectedPlaylistInfo: "",
    selectedPlaylistTracksInfo: "",
    songOptionsSelected: false,
    selectedSongInfo: "HI",
    playlistOptionsSelected: false,
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
          "Added song to queue",
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

  getSpotifyLibrary = () => {
    this.setState({
      selectedPlatform: "Spotify",
    });

    spotifyWebApi.getMySavedTracks({ limit: 50 }).then(
      (response) => {
        this.setState({
          spotifyFavoritesResults: response.items,
        });
        global.spotifyFavoritesResults = response.items;
      },
      (reason) => {
        console.log("GOT TO ERROR");
        console.error(reason); // Error!
      }
    );

    spotifyWebApi.getUserPlaylists().then(
      (response) => {
        this.setState({
          spoitfyPlaylistsResults: response.items,
        });
        global.spoitfyPlaylistsResults = response.items;
      },
      (reason) => {
        console.log("GOT TO ERROR");
        console.error(reason); // Error!
      }
    );

    spotifyWebApi.getMe().then(
      (response) => {
        global.spotifyUserID = response.id;
      },
      (reason) => {
        console.log("GOT TO ERROR (getME)");
        console.error(reason); // Error!
        this.createNotification("error");
      }
    );
  };

  tabClick = (tabName) => {
    var i, tablinks;

    tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
      if (tablinks[i].id === tabName) {
        tablinks[i].className = "tablinks active";
      } else {
        tablinks[i].className = "tablinks";
      }
    }

    this.setState({
      selectedTab: tabName,
    });
  };

  getPlaylistTracks = (playlistID) => {
    const userID = global.spotifyUserID;

    spotifyWebApi.getPlaylistTracks(userID, playlistID).then(
      (response) => {
        this.setState({
          selectedPlaylistTracksInfo: response.items,
        });
      },
      (reason) => {
        console.log("GOT TO ERROR (getPlaylistTracks)");
        this.createNotification("error");
        console.error(reason); // Error!
      }
    );
  };

  showPlaylist = (playlistInfo) => {
    console.log(playlistInfo);

    var div = document.getElementsByClassName("libraryDiv")[0];
    div.style.height = "69%";

    this.getPlaylistTracks(playlistInfo.id);

    this.setState({
      playlistSelected: true,
      selectedPlaylistInfo: playlistInfo,
    });
  };

  backToLibraryFromPlaylist = () => {
    var div = document.getElementsByClassName("libraryDiv")[0];
    div.style.height = "78%";

    this.setState({
      playlistSelected: false,
      selectedTab: "Playlists",
    });
  };

  showSongOptions = (songInfo) => {
    var songInfoCopy = songInfo.track;

    this.setState({
      songOptionsSelected: true,
      playlistOptionsSelected: false,
      selectedSongInfo: songInfoCopy,
    });
  };

  showPlaylistOptions = (playlistInfo) => {
    this.setState({
      playlistOptionsSelected: true,
      songOptionsSelected: false,
      selectedPlaylistInfo: playlistInfo,
    });
  };

  playSongNow = (songInfo) => {
    var songInfoCopy = songInfo.track;

    const songURI = songInfoCopy["uri"];

    global.youtubePlayer.pauseVideo();

    playURI(songURI, global.spotifyAccessToken);

    global.isContentPlaying = true;

    // Set song as currently playing
    global.currentlyPlaying = ["Spotify", songInfoCopy];

    this.context.updateSessionQueue(global.sessionQueue);
  };

  // Add Spotify song to queue and send notification
  addSongToQueue = (platform, songInfo) => {
    addSongToQueue(platform, songInfo);
    this.createNotification("success");
  };

  // Add Spotify song to queue and send notification
  addPlaylistToQueue = (platform, playlistInfo) => {
    addPlaylistToQueue(platform, playlistInfo);
    this.createNotification("success");
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
      <div className="libraryFlex">
        {/* If a playlist is not selected, show library */}
        {!this.state.playlistSelected ? (
          <div className="libraryMiddle">
            <div className="libraryQueryDiv">
              <div className="libraryTabDiv">
                <button
                  class={
                    this.state.selectedTab === "Favorites"
                      ? "tablinks active"
                      : "tablinks"
                  }
                  onClick={() => this.tabClick("Favorites")}
                  id="Favorites">
                  Favorites
                </button>
                <button
                  class={
                    this.state.selectedTab === "Playlists"
                      ? "tablinks active"
                      : "tablinks"
                  }
                  onClick={() => this.tabClick("Playlists")}
                  id="Playlists">
                  Playlists
                </button>
              </div>
              <div className="libraryButtonDiv">
                <button
                  id="spotifyLibraryBtn"
                  onClick={this.getSpotifyLibrary}></button>
              </div>
              <p id="libraryDivHeader">
                {this.state.spotifyFavoritesResults.length > 0
                  ? "Spotify " + this.state.selectedTab
                  : "Click desired platform to see library.."}
              </p>
            </div>
            <LibraryResults
              selectedTab={this.state.selectedTab}
              showPlaylist={this.showPlaylist}
              showSongOptions={this.showSongOptions}
              playSongNow={this.playSongNow}
              addSongToQueue={this.addSongToQueue}
              libraryPullResults={
                this.state.selectedTab === "Favorites"
                  ? this.state.spotifyFavoritesResults
                  : this.state.spoitfyPlaylistsResults
              }></LibraryResults>
          </div>
        ) : (
          // Else, if a playlist is selected, show playlist tracks
          <div className="libraryMiddle">
            <div className="playlistHeaderDiv">
              <button
                id="backToLibraryBtn"
                onClick={this.backToLibraryFromPlaylist}></button>
              <button
                id="playlistOptionsBtn"
                onClick={() =>
                  this.showPlaylistOptions(this.state.selectedPlaylistInfo)
                }></button>

              <div className="playlistHeaderInfoDiv">
                <img
                  id="playlistHeaderImg"
                  src={this.state.selectedPlaylistInfo.images[0].url}
                  alt=""></img>
                <p className="playlistHeaderTitle">
                  {this.state.selectedPlaylistInfo.name}
                </p>
                <p className="numTracksHeader">
                  {this.state.selectedPlaylistInfo.tracks.total + " songs"}
                </p>
              </div>
            </div>
            <LibraryResults
              selectedTab={"Favorites"}
              showPlaylist={this.showPlaylist}
              showSongOptions={this.showSongOptions}
              playSongNow={this.playSongNow}
              libraryPullResults={
                this.state.selectedPlaylistTracksInfo
              }></LibraryResults>
          </div>
        )}
        <NotificationContainer />

        {/* If Song Options was selected, show selected song info on right side */}
        {this.state.songOptionsSelected ? (
          <div className="libraryRight">
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
                this.addSongToQueue(
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
        ) : // If Playlist Options was selected, show selected playlist info on right side
        this.state.playlistOptionsSelected ? (
          <div className="libraryRight">
            <img
              className="songOptionsAlbumImg"
              src={this.state.selectedPlaylistInfo.images[0].url}
              alt=""></img>

            <p className="songOptionsTitle">
              {this.state.selectedPlaylistInfo.name}
            </p>
            <p className="songOptionsArtist">
              {this.state.selectedPlaylistInfo.tracks.total + " songs"}
            </p>
            <div id="firstSeparatorLine"></div>
            <button
              id="addToQueueBtn"
              onClick={() =>
                this.addPlaylistToQueue(
                  this.state.selectedPlatform,
                  this.state.selectedPlaylistInfo
                )
              }></button>
            <div id="secondSeparatorLine"></div>
            <button
              id="viewOnSpotifyBtn"
              onClick={() =>
                viewOnSpotify(this.state.selectedPlaylistInfo)
              }></button>
          </div>
        ) : (
          // If nothing selected, show nothing on right side
          <div className="libraryRight"></div>
        )}
      </div>
    );
  }
}

LibraryWeb.contextType = SessionContext;

export default LibraryWeb;
