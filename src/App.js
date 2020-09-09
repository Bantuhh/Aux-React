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
  withRouter,
} from "react-router-dom";

import { createBrowserHistory } from "history";

// Side Nav imports
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import "font-awesome/css/font-awesome.min.css";

// Import Auth0Context instead of useAuth0
import { Auth0Context } from "./react-auth0-spa";

import SpotifyPlayer from "react-spotify-web-playback";

class App extends Component {
  componentDidMount() {
    document.body.style.background = "#252525";
  }
  state = {
    currentSong: [],
    queue: [],
    spotifyURIQueue: ["spotify:track:2aPTvyE09vUCRwVvj0I8WK"],
    timeToSkip: true,
    currentSongsPlatform: "Spotify",
    spotifyAccessToken: "",
  };

  popQueue = (queue) => {
    if (queue.length == 0) {
      return ["None", []];
    }

    var currentSong = queue.pop(0);

    return [currentSong, queue];
  };

  readGlobalQueue = () => {
    if (global.sessionQueue.length === 0) {
      return;
    } else if (global.isContentPlaying) {
    }
  };

  checkPlayerStatus = (state) => {
    console.log("Player Status: ", state);
  };

  spotifyLogin = () => {
    console.log("spotifyAccessToken", global.spotifyAccessToken);

    this.setState({
      spotifyAccessToken: global.spotifyAccessToken,
    });
  };

  static contextType = Auth0Context;

  getCurrentPageName = () => {
    console.log(this.props.location.pathname);
    return this.props.location.pathname;
  };

  render() {
    const {
      loading,
      isAuthenticated,
      loginWithRedirect,
      logout,
    } = this.context;

    const history = createBrowserHistory();

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
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
                          className="fa fa-fw fa-spotify"
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
                  uris={"spotify:track:2aPTvyE09vUCRwVvj0I8WK"}
                  play={true}
                  callback={(state) => this.checkPlayerStatus(state)}
                />
              )}
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
    );
  }
}

export default App;
