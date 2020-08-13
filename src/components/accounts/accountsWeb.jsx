import React, { Component } from "react";

import "../../styles/AccountsWeb.css";

import "../../global.js";

import spotifyLogo from "../../resources/images/Spotify.png";

import $ from "jquery";

import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class AccountsWeb extends Component {
  constructor() {
    super();
    const params = this.getHashParams();

    if (params.access_token) {
      global.spotifyLoggedIn = true;
      global.spotifyAccessToken = params.access_token;

      spotifyWebApi.setAccessToken(params.access_token);
      this.getUserData(params.access_token).then((response) => {
        this.setState({
          userImage: response.images[0].url,
        });
        global.spotifyUserImage = response.images[0].url;
      });
    }

    this.state = {
      loggedIn: global.spotifyLoggedIn,
      accessToken: global.spotifyAccessToken,
      userImage: global.spotifyUserImage,
    };

    this.logout = this.logout.bind(this);
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    return hashParams;
  }

  getUserData(accessToken) {
    return $.ajax({
      url: "https://api.spotify.com/v1/me",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  }

  logout() {
    global.spotifyLoggedIn = false;
    global.spotifyAccessToken = "";
    this.setState({
      loggedIn: false,
      accessToken: "",
      userImage: "",
    });
  }

  render() {
    return (
      <div className="accountsDiv">
        <div className="spotifyBox">
          <p id="spotifyHeader">Spotify</p>
          <img id="spotifyLogo" src={spotifyLogo} alt=""></img>
          {this.state.loggedIn === false ? (
            <a href="http://localhost:8888">
              <button id="loginButton">Login to your Spotify</button>
            </a>
          ) : (
            <div id="loggedInDiv">
              <div id="loggedInText">
                <img
                  className="userImage"
                  src={this.state.userImage}
                  alt=""></img>
                <p id="loggedInHeader">Your Permissions Include:</p>
                <div id="loggedInLine"></div>
                <p id="loggedIn">
                  - Read access to user’s subscription details
                </p>
                <p id="loggedIn">- Read access to user’s email address</p>
                <p id="loggedIn">- Read access to user’s player state</p>
                <p id="loggedIn">
                  - Read access to user's "Your Music" library
                </p>
                <p id="loggedIn">- Write access to a user’s playback state</p>
              </div>
              <button id="logoutButton" onClick={this.logout}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AccountsWeb;
