import React, { Component } from "react";

import MediaQuery from "react-responsive";

import NavBar from "../components/navbar";

import AccountsWeb from "../components/accounts/accountsWeb";
import AccountsMobile from "../components/accounts/accountsMobile";

class Accounts extends Component {
  render() {
    return (
      <div class="accounts">
        <NavBar></NavBar>

        <MediaQuery query="(min-device-width: 1224px)">
          <MediaQuery query="(min-width: 1225px)">
            <AccountsWeb></AccountsWeb>
          </MediaQuery>
          <MediaQuery query="(max-width: 1224px)">
            <AccountsWeb></AccountsWeb>
          </MediaQuery>
        </MediaQuery>

        <MediaQuery query="(max-device-width: 1224px)">
          <MediaQuery query="(min-device-width: 1024px)">
            <AccountsMobile></AccountsMobile>
          </MediaQuery>

          <MediaQuery query="(max-device-width: 1023px)">
            <AccountsMobile></AccountsMobile>
          </MediaQuery>
        </MediaQuery>
      </div>
    );
  }
}

export default Accounts;
