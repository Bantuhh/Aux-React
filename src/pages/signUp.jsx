import React, { Component } from "react";
import MediaQuery from "react-responsive";

import "../styles/SignUp.css";

class SignUp extends Component {
  render() {
    return (
      <div>
        <div>Device Test!</div>
        <MediaQuery query="(min-width: 1224px)">
          <div>You are sized like a desktop!</div>
        </MediaQuery>
        <MediaQuery query="(min-width: 600px, max-width: 1224px)">
          <div>You are sized like a tablet!</div>
        </MediaQuery>
        <MediaQuery query="(min-width: 100px, max-width: 600px)">
          <div>You are sized like a mobile phone!</div>
        </MediaQuery>

        <MediaQuery query="(min-device-width: 1224px)">
          <div>You are a desktop or laptop</div>
          <MediaQuery query="(min-device-width: 1824px)">
            <div>You also have a huge screen</div>
          </MediaQuery>
          <MediaQuery query="(max-width: 1224px)">
            <div>You are sized like a tablet or mobile phone though</div>
          </MediaQuery>
        </MediaQuery>

        <MediaQuery query="(max-device-width: 1224px)">
          <MediaQuery query="(min-device-width: 500px)">
            <div>You are a tablet</div>
          </MediaQuery>

          <MediaQuery query="(max-device-width: 500px)">
            <div>You are a mobile phone</div>
          </MediaQuery>

          <MediaQuery query="(orientation: portrait)">
            <div>You are portrait</div>
          </MediaQuery>
          <MediaQuery query="(orientation: landscape)">
            <div>You are landscape</div>
          </MediaQuery>
        </MediaQuery>

        <MediaQuery query="(min-resolution: 2dppx)">
          <div>You are retina</div>
        </MediaQuery>
      </div>
    );
  }
}

export default SignUp;
