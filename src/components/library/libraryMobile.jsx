import React, { Component } from "react";
import { SessionContext } from "../../session-context";

import { addSongToQueue, addPlaylistToQueue } from "../../utils/queueInterface";

import { viewOnSpotify, playURI, formatArtistString } from "../../utils/spotifyInterface";

import "./Library.css";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import LibraryResults from "./libraryResults";

import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class LibraryMobile extends Component {
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
      default:
        console.log("Not a known notification")
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
        console.log(response.items);
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

    // Get next 50 favorites as well
    spotifyWebApi.getMySavedTracks({ offset: 50, limit: 50 }).then(
      (response) => {
        var newResults = this.state.spotifyFavoritesResults;
        var newKey = 50;
        for (var key in response.items) {
          newResults[newKey] = response.items[key]
          newKey += 1;
        }
        this.setState({
          spotifyFavoritesResults: newResults,
        });
        global.spotifyFavoritesResults = newResults;
        console.log(newResults);
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
    div.style.height = "65%";

    this.getPlaylistTracks(playlistInfo.id);

    this.setState({
      playlistSelected: true,
      selectedPlaylistInfo: playlistInfo,
    });

    
  };

  backToLibraryFromPlaylist = () => {
    

    this.setState({
      playlistSelected: false,
      selectedTab: "Playlists",
    });

    var div = document.getElementsByClassName("libraryDiv")[0];
    div.style.height = "80%";
  };

  backToLibraryFromOptions = (from) => {
    
    if (from === "song") {
      this.setState({
        songOptionsSelected: false,
      });
    } else {
      this.setState({
        playlistOptionsSelected: false,
      });
    }
    

  };

  showSongOptions = (songInfo) => {
    var songInfoCopy = songInfo.track;
    console.log("showSongOptions", songInfoCopy)
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

    // Reset Song Progress Bar
    global.currentContentPosition = 0;

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

  render() {
    return (
      <div className="libraryFlexMobile">
        {/* If a playlist is not selected, show library */}
        {!this.state.playlistSelected ? (
          <div className="libraryMiddleMobile">
            <div className="libraryQueryDivMobile">
              <div className="libraryTabDiv">
                <button
                  className={
                    this.state.selectedTab === "Favorites"
                      ? "tablinks active"
                      : "tablinks"
                  }
                  onClick={() => this.tabClick("Favorites")}
                  id="Favorites">
                  Favorites
                </button>
                <button
                  className={
                    this.state.selectedTab === "Playlists"
                      ? "tablinks active"
                      : "tablinks"
                  }
                  onClick={() => this.tabClick("Playlists")}
                  id="Playlists">
                  Playlists
                </button>
              </div>
              <div className="libraryButtonDivMobile">
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
              showingPlaylistContent={this.state.playlistSelected}
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
          <div className="libraryMiddleMobile">
            <div className="playlistHeaderDivMobile">
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
              showingPlaylistContent={this.state.playlistSelected}
              showSongOptions={this.showSongOptions}
              addSongToQueue={this.addSongToQueue}
              playSongNow={this.playSongNow}
              libraryPullResults={
                this.state.selectedPlaylistTracksInfo
              }></LibraryResults>
          </div>
        )}
        <NotificationContainer />

        {/* If Song Options was selected, show selected song info on right side */}
        {this.state.songOptionsSelected ? (
          <div className="libraryOptionsModal" style={{display: 'block'}}>
            <div className='libraryOptionsContentDiv'>
              <button
                  id="exitOptionsBtn"
                  onClick={() => this.backToLibraryFromOptions('song')}></button>
              <img
                className="songOptionsAlbumImg"
                src={this.state.selectedSongInfo.album.images[0].url}
                alt=""></img>

              <p className="songOptionsTitle">
                {this.state.selectedSongInfo.name}
              </p>
              <p className="songOptionsArtist">
                {formatArtistString(this.state.selectedSongInfo.artists)}
              </p>
              <div id="firstSeparatorLineMobile"></div>
              <button
                id="addToQueueBtnMobile"
                onClick={() =>
                  this.addSongToQueue(
                    this.state.selectedPlatform,
                    this.state.selectedSongInfo
                  )
                }></button>
              <div id="secondSeparatorLineMobile"></div>
              <button
                id="viewOnSpotifyBtnMobile"
                onClick={() =>
                  viewOnSpotify(this.state.selectedSongInfo)
                }></button>
              </div>
          </div>
        ) : // If Playlist Options was selected, show selected playlist info on right side
        this.state.playlistOptionsSelected ? (
          <div className="libraryOptionsModal" style={{display: 'block'}}>
            <div className='libraryOptionsContentDiv'>
              <button
                  id="exitOptionsBtn"
                  onClick={() => this.backToLibraryFromOptions('playlist')}></button>
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
              <div id="firstSeparatorLineMobile"></div>
              <button
                id="addToQueueBtnMobile"
                onClick={() =>
                  this.addPlaylistToQueue(
                    this.state.selectedPlatform,
                    this.state.selectedPlaylistInfo
                  )
                }></button>
              <div id="secondSeparatorLineMobile"></div>
              <button
                id="viewOnSpotifyBtnMobile"
                onClick={() =>
                  viewOnSpotify(this.state.selectedPlaylistInfo)
                }></button>
              </div>
          </div>
        ) : (
          // If nothing selected, show nothing on right side
          <div></div>
        )}
      </div>
    );
  }
}

LibraryMobile.contextType = SessionContext;

export default LibraryMobile;
