import React, { Component } from "react";

import "./AccountsMobile.css";

import "../../global.js";

import spotifyLogo from "../../resources/images/Spotify.png";

import AuxProfile from "../../utils/AuxProfile"

import { Auth0Context } from "../../react-auth0-spa";

import $ from "jquery";

import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class AccountsMobile extends Component {
  static contextType = Auth0Context;

  constructor(props) {
    super(props);

    const params = this.getHashParams();

    if (params.access_token) {
      console.log(params)
      global.spotifyLoggedIn = true;
      global.spotifyAccessToken = params.access_token;

      spotifyWebApi.setAccessToken(params.access_token);
      this.getUserData(params.access_token).then((response) => {
        this.setState({
          loggedIn: global.spotifyLoggedIn,
          accessToken: global.spotifyAccessToken,
          userImage: response.images[0].url,
        });
        global.spotifyUserImage = response.images[0].url;

        console.log("Setting Aux Profile spotify login")
        AuxProfile.setSpotifyData({
          loggedIn: true,
          accessToken: global.spotifyAccessToken,
          userImage: response.images[0].url,
        })

      });

      this.props.spotifyLogin();

    }

    console.log("refreshing spotify login")
    this.refreshSpotifyLogin()

    // this.state = {
    //   loggedIn: global.spotifyLoggedIn,
    //   accessToken: global.spotifyAccessToken,
    //   userImage: global.spotifyUserImage,
    // };



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

  refreshSpotifyLogin() {
    var spotifyData = AuxProfile.getSpotifyData();

    console.log("Retrieved Spotify data", spotifyData)

    // If logged in to spotify, send login info to api
    if (spotifyData.accessToken) {
      global.spotifyLoggedIn = true;
      global.spotifyAccessToken = spotifyData.accessToken;
      global.spotifyUserImage = spotifyData.userImage

      spotifyWebApi.setAccessToken(spotifyData.accessToken);
      this.props.spotifyLogin();
    }

    this.setState({
      loggedIn: spotifyData.loggedIn,
      accessToken: spotifyData.accessToken,
      userImage: spotifyData.userImage,
    });
  }

  state = {
    loggedIn: AuxProfile.getSpotifyData().loggedIn,
    accessToken: AuxProfile.getSpotifyData().accessToken,
    userImage: AuxProfile.getSpotifyData().userImage,
  };

  render() {
    const { isAuthenticated, loginWithRedirect, logout } = this.context;

    if (!isAuthenticated) {
      console.log("Not Authenticated, relogging in")
      loginWithRedirect({});
    }

    // this.refreshSpotifyLogin()

    return (
      <div className="accountsDivMobile">
        <div style={{ height: '50%', color: 'white' }}>{JSON.stringify(this.state)}</div>
        <div style={{ height: '50%', color: 'white' }}>{AuxProfile.getSpotifyData()}</div>
        <div id="musicAccountsHeading">Music Accounts: </div>
        <div id="musicAccountsBody">Log in to access Favorites, Playlists, and Search functionality. </div>
        <div className="spotifyBoxMobile" style={{ height: this.state.loggedIn === false ? '15vh' : '30vh' }}>
          <div className="spotifyHeaderAndLogoDiv">
            <p id="spotifyHeaderMobile">Spotify</p>
            <img id="spotifyLogoMobile" src={spotifyLogo} alt=""></img>
          </div>
          {this.state.loggedIn === false ? (
            <a href="http://spotifynodeserver-env.eba-xnyukggx.us-east-2.elasticbeanstalk.com/">
              <button id="loginButtonMobile">Login to your Spotify</button>
            </a>
          ) : (
            <div id="loggedInDivMobile">
              <img
                className="userImageMobile"
                src={this.state.userImage}
                alt=""></img>
              <div className='textAndButtonDiv'>
                <div id="loggedInTextMobile">
                  <p id="loggedInHeaderMobile">Your Permissions Include:</p>
                  <div id="loggedInLine"></div>
                  <p id="loggedInMobile">
                    - Read access to user’s subscription details
                  </p>
                  <p id="loggedInMobile">- Read access to user’s email address</p>
                  <p id="loggedInMobile">- Read access to user’s player state</p>
                  <p id="loggedInMobile">
                    - Read access to user's "Your Music" library
                  </p>
                  <p id="loggedInMobile">- Write access to a user’s playback state</p>
                </div>
                <button id="logoutButtonMobile" onClick={this.logout}>
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AccountsMobile;
