import React, { Component } from "react";
import "./App.css";
import Session from "./pages/session";
import Search from "./pages/search";
import Library from "./pages/library";
import Welcome from "./pages/welcome";
import SignUp from "./pages/signUp";
import Accounts from "./pages/accounts";

import NotFoundPage from "./pages/404";

//Import all needed Component for this tutorial
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Import Notifications
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

// Side Nav imports
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import "font-awesome/css/font-awesome.min.css";

import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';

// Import Auth0Context instead of useAuth0
import { Auth0Context } from "./react-auth0-spa";

import SpotifyPlayer from "react-spotify-web-playback";

import { SessionContext } from "./session-context";

import YouTube from "react-youtube";

class App extends Component {
  componentDidMount() {
    document.body.style.background = "#252525";
  }

  createNotification = (type) => {
    console.log("GOT TO CREATE NOTIFICATION");
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        break;
      case "success":
        NotificationManager.success(
          "I knew you could do it.",
          "Song added to queue",
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
          "Make sure you are logged into your Spotify.",
          "Error!",
          5000,
          () => {
            //alert("callback");
          }
        );
        break;
    }
    return () => {};
  };

  checkPlayerStatus = (state) => {
    console.log("Player Status: ", state);

    if (state.deviceId != "") {
      global.spotifyDeviceID = state.deviceId;
    }

    if ((state.type === "track_update") | (state.type === "player_update")) {
      this.setState({ sessionQueue: global.sessionQueue });
    }

    if (
      (state.type === "player_update") &
      !state.isPlaying &
      (global.currentlyPlaying[0] === "Spotify")
    ) {
      global.isContentPlaying = false;
      this.setState({ isContentPlaying: false });
    }

    if ((state.type === "player_update") & state.isPlaying) {
      global.isContentPlaying = true;
      this.setState({ isContentPlaying: true });
    }

    if (state.errorType === "authentication_error") {
      this.createNotification("error");
    }

    if (state.isPlaying & state.position === 0) {
      global.currentContentPosition = 0;
      this.setState({ isContentPlaying: true });
    }

    
  };

  timer = null;

  durationCounter = () => {

    this.timer = setInterval(async () => {
      if (global.isContentPlaying) {  
          
          console.log(global.currentContentPosition);
          this.setState({ currentContentPosition: global.currentContentPosition, isContentPlaying: true });
          global.currentContentPosition += 1;
          
          
      }
      
    }, 1000);
  };

  startTimer = () => {
    console.log("starting duration timer" )
    this.durationCounter();
  }

  spotifyLogin = () => {
    console.log("spotifyAccessToken", global.spotifyAccessToken);

    this.setState({
      spotifyAccessToken: global.spotifyAccessToken,
    });
  };

  static contextType = Auth0Context;

  // Set up Context environment
  updateSessionQueue = (newQueue) => {
    this.setState({ sessionQueue: newQueue });
  };

  // YouTube functions
  loadYTVideo = (videoId) => {
    this.state.youtubePlayer.loadVideoById(videoId, 0);
  };

  _onReady = (event) => {
    // access to player in all event handlers via event.target
    global.youtubePlayer = event.target;
    this.setState({ youtubePlayer: event.target });
  };

  _onVideoEnd = (event) => {
    global.isContentPlaying = false;
    global.skipSong();
    this.updateSessionQueue(global.sessionQueue);
  };

  state = {
    sessionQueue: global.sessionQueue,
    currentlyPlaying: global.currentlyPlaying,
    isContentPlaying: global.isContentPlaying,
    updateSessionQueue: this.updateSessionQueue,
    spotifyAccessToken: global.spotifyAccessToken,
    youtubePlayer: "",
    loadYTVideo: this.loadYTVideo,
    currentContentPosition: global.currentContentPosition
  };

  render() {
    const { loading, isAuthenticated } = this.context;

    const opts = {
      height: "0",
      width: "0",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        controls: 1,
      },
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!global.timerStarted) {
      this.startTimer();
      global.timerStarted = true;
    }

    return (
      <DndProvider options={HTML5toTouch}>
      <SessionContext.Provider value={this.state}>
        <Router>
          <Route
            render={({ location, history }) => (
              <React.Fragment>
                {isAuthenticated && (
                  <SideNav
                    className="sidenav"
                    onSelect={(selected) => {
                      const to = "/" + selected;
                      if (location.pathname !== to) {
                        history.push(to);
                      }
                    }}>
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected={history.location.pathname}>
                      <NavItem eventKey="Session">
                        <NavIcon>
                          <i
                            className="fa fa-fw fa-play-circle"
                            style={{ fontSize: "1.75em" }}
                          />
                        </NavIcon>
                        <NavText>Session</NavText>
                      </NavItem>
                      <NavItem eventKey="Search">
                        <NavIcon>
                          <i
                            className="fa fa-fw fa-search"
                            style={{ fontSize: "1.75em" }}
                          />
                        </NavIcon>
                        <NavText>Search</NavText>
                      </NavItem>
                      <NavItem eventKey="Library">
                        <NavIcon>
                          <i
                            className="fa fa-fw fa-book"
                            style={{ fontSize: "1.75em" }}
                          />
                        </NavIcon>
                        <NavText>Library</NavText>
                      </NavItem>

                      <NavItem eventKey="Accounts">
                        <NavIcon>
                          <i
                            className="fa fa-fw fa-user-circle"
                            style={{ fontSize: "1.75em" }}
                          />
                        </NavIcon>
                        <NavText>Music Accounts</NavText>
                      </NavItem>
                    </SideNav.Nav>
                  </SideNav>
                )}
                {isAuthenticated && (
                  <SpotifyPlayer
                    token={this.state.spotifyAccessToken}
                    // uris={[]}
                    // autoPlay={true}
                    play={true}
                    callback={(state) => this.checkPlayerStatus(state)}
                  />
                )}
                <YouTube
                  className="YoutubePlayer"
                  videoId="7f6K1U6lH5Q"
                  opts={opts}
                  onReady={this._onReady}
                  onEnd={this._onVideoEnd}
                />
                <NotificationContainer />
                <main>
                  <Switch>
                    <Route exact path="/Session" component={Session} />
                    <Route exact path="/Search" component={Search} />
                    <Route exact path="/Library" component={Library} />
                    {!isAuthenticated && (
                      <Route exact path="/Welcome" component={Welcome} />
                    )}

                    <Route
                      exact
                      path="/Accounts"
                      render={(props) => (
                        <Accounts {...props} spotifyLogin={this.spotifyLogin} />
                      )}
                    />
                    <Route exact path="/signUp" component={SignUp} />
                    <Route exact path="/404" component={NotFoundPage} />
                    {isAuthenticated && <Redirect to="/Session" />}
                    {!isAuthenticated && <Redirect to="/Welcome" />}
                  </Switch>
                </main>
              </React.Fragment>
            )}
          />
        </Router>
      </SessionContext.Provider>
      </DndProvider>
    );
  }
}

export default App;
