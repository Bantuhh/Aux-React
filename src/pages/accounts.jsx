import React, { Component } from "react";

import MediaQuery from "react-responsive";

import NavBar from "../components/navbar";

import AccountsWeb from "../components/accounts/accountsWeb";
import AccountsMobile from "../components/accounts/accountsMobile";

class Accounts extends Component {
  render() {
    return (
      <div className="accounts">
        

        <MediaQuery query="(min-device-width: 1025px)">
        <NavBar></NavBar>
        <AccountsWeb
              spotifyLogin={() => this.props.spotifyLogin()}></AccountsWeb>
          {/* <MediaQuery query="(min-width: 1225px)">
            <AccountsWeb
              spotifyLogin={() => this.props.spotifyLogin()}></AccountsWeb>
          </MediaQuery>
          <MediaQuery query="(max-width: 1224px)">
            <AccountsWeb
              spotifyLogin={() => this.props.spotifyLogin()}></AccountsWeb>
          </MediaQuery> */}
        </MediaQuery>

        <MediaQuery query="(max-device-width: 1024px)">
        <AccountsMobile
              spotifyLogin={() => this.props.spotifyLogin()}></AccountsMobile>
          {/* <MediaQuery query="(min-device-width: 1024px)">
            <AccountsMobile
              spotifyLogin={() => this.props.spotifyLogin()}></AccountsMobile>
          </MediaQuery>

          <MediaQuery query="(max-device-width: 1023px)">
            <AccountsMobile
              spotifyLogin={() => this.props.spotifyLogin()}></AccountsMobile>
          </MediaQuery> */}
        </MediaQuery>
      </div>
    );
  }
}

export default Accounts;
