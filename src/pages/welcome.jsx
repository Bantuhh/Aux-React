import React, { Component } from "react";

import MediaQuery from "react-responsive";

import "../styles/WelcomeWeb.css";
import "../styles/WelcomeMobile.css";
import "../styles/WelcomeTablet.css";

import NavBar from "../components/navbar";
import WelcomeTextWeb from "../components/welcome/welcomeTextWeb";
import WelcomeTextTablet from "../components/welcome/welcomeTextTablet";
import WelcomeTextMobile from "../components/welcome/welcomeTextMobile";

import InfoSquaresMobile from "../components/welcome/infoSquaresMobile.jsx";
import InfoSquaresWeb from "../components/welcome/infoSquaresWeb.jsx";

// import HomeSignInWeb from "../components/welcome/homeSignInWeb.jsx";

import "../global.js";

import $ from "jquery";

import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class Welcome extends Component {
  constructor(props) {
    super(props);
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

      this.props.spotifyLogin();
    }

    this.state = {
      loggedIn: global.spotifyLoggedIn,
      accessToken: global.spotifyAccessToken,
      userImage: global.spotifyUserImage,
    };

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

  render() {
    return (
      <div class="home">
        <NavBar></NavBar>

        <MediaQuery query="(min-device-width: 1224px)">
          <MediaQuery query="(min-width: 1225px)">
            <WelcomeTextWeb />
            <InfoSquaresWeb />

            {/* <HomeSignInWeb /> */}
          </MediaQuery>
          <MediaQuery query="(max-width: 1224px)">
            <WelcomeTextTablet />
            <InfoSquaresWeb />
            {/* <HomeSignInWeb /> */}
          </MediaQuery>
        </MediaQuery>

        <MediaQuery query="(max-device-width: 1224px)">
          <MediaQuery query="(min-device-width: 1024px)">
            <WelcomeTextTablet />
            <InfoSquaresMobile />
          </MediaQuery>

          <MediaQuery query="(max-device-width: 1023px)">
            <WelcomeTextMobile />
            <InfoSquaresMobile />
          </MediaQuery>

          {/* <MediaQuery query="(orientation: portrait)">
            <div>You are portrait</div>
          </MediaQuery>
          <MediaQuery query="(orientation: landscape)">
            <div>You are landscape</div>
          </MediaQuery> */}
        </MediaQuery>

        {/* <Link styles={{ margin_top: "200px" }} to="/signUp">
          Go to sign up
        </Link> */}
      </div>
    );
  }
}

export default Welcome;
