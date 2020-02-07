import React, { Component } from "react";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";

import "../styles/HomeWeb.css";
import "../styles/HomeMobile.css";
import "../styles/HomeTablet.css";

import NavBar from "../components/navbar";
import WelcomeTextWeb from "../components/home/welcomeTextWeb";
import WelcomeTextTablet from "../components/home/welcomeTextTablet";
import WelcomeTextMobile from "../components/home/welcomeTextMobile";

import InfoSquaresMobile from "../components/home/infoSquaresMobile.jsx";
import InfoSquaresWeb from "../components/home/infoSquaresWeb.jsx";

import HomeSignInWeb from "../components/home/homeSignInWeb.jsx";

class Home extends Component {
  render() {
    return (
      <div class="home">
        <NavBar></NavBar>

        <MediaQuery query="(min-device-width: 1224px)">
          <MediaQuery query="(min-width: 1225px)">
            <WelcomeTextWeb />
            <InfoSquaresWeb />
            <HomeSignInWeb />
          </MediaQuery>
          <MediaQuery query="(max-width: 1224px)">
            <WelcomeTextTablet />
            <InfoSquaresWeb />
            <HomeSignInWeb />
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

export default Home;
