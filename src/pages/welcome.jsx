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

class Welcome extends Component {
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
