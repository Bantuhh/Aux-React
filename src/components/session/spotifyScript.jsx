import React, { Component } from "react";

import Script from "react-load-script";

class SpotifyScript extends Component {
  state = {};

  handleScriptLoad = () => {
    return new Promise((resolve) => {
      if (window.Spotify) {
        resolve();
      } else {
        window.onSpotifyWebPlaybackSDKReady = resolve;
      }
    });
  };

  handleScriptError = () => {
    console.log("SCRIPT ERROR");
  };

  render() {
    return (
      <Script
        url="https://sdk.scdn.co/spotify-player.js"
        onError={this.handleScriptError}
        onLoad={this.handleScriptLoad}></Script>
    );
  }
}

export default SpotifyScript;
