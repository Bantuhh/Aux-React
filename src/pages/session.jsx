import React, { Component } from "react";

import MediaQuery from "react-responsive";

import NavBar from "../components/navbar";

import SessionWeb from "../components/session/sessionWeb";
import SessionMobile from "../components/session/sessionMobile";

class Session extends Component {
  render() {
    return (
      <div class="session">
        <NavBar></NavBar>

        <MediaQuery query="(min-device-width: 1224px)">
          <MediaQuery query="(min-width: 1225px)">
            <SessionWeb></SessionWeb>
          </MediaQuery>
          <MediaQuery query="(max-width: 1224px)">
            <SessionWeb></SessionWeb>
          </MediaQuery>
        </MediaQuery>

        <MediaQuery query="(max-device-width: 1224px)">
          <MediaQuery query="(min-device-width: 1024px)">
            <SessionMobile></SessionMobile>
          </MediaQuery>

          <MediaQuery query="(max-device-width: 1023px)">
            <SessionMobile></SessionMobile>
          </MediaQuery>
        </MediaQuery>

        {/* <Link styles={{ margin_top: "200px" }} to="/signUp">
          Go to sign up
        </Link> */}
      </div>
    );
  }
}

export default Session;
