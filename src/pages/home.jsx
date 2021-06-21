import React, { Component } from "react";
import MediaQuery from "react-responsive";
import NavBar from "../components/navbar";

import { Auth0Context } from "../react-auth0-spa";

class Home extends Component {
  static contextType = Auth0Context;

  render() {
    const { isAuthenticated, loginWithRedirect, logout } = this.context;
    return (
      <div class="home">
        <NavBar></NavBar>

        <MediaQuery query="(min-device-width: 1025px)">
        <HomeWeb></HomeWeb>
          {/* <MediaQuery query="(min-width: 1225px)">
            <HomeWeb></HomeWeb>
          </MediaQuery>
          <MediaQuery query="(max-width: 1224px)">
            <HomeTablet></HomeTablet>
          </MediaQuery> */}
        </MediaQuery>

        <MediaQuery query="(max-device-width: 1024px)">
          <MediaQuery query="(min-device-width: 768px)">
            <HomeTablet></HomeTablet>
          </MediaQuery>

          <MediaQuery query="(max-device-width: 767px)">
            <HomeMobile></HomeMobile>
          </MediaQuery>
        </MediaQuery>
      </div>
    );
  }
}

export default Home;
