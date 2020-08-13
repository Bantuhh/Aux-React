import React, { Component } from "react";
import "../styles/NavBar.css";

import AuxNavImg from "../resources/images/AuxNavImg.png";

import { Auth0Context } from "../react-auth0-spa";

class NavBar extends Component {
  static contextType = Auth0Context;

  render() {
    const { isAuthenticated, loginWithRedirect, logout } = this.context;

    return (
      <nav className="navbar navbar-dark fixed-top">
        <a className="navbar-brand" href="/">
          <img src={AuxNavImg} alt="" />
        </a>
        {!isAuthenticated && (
          <button
            className="loginBtn"
            onClick={() => loginWithRedirect({})}></button>
        )}

        {isAuthenticated && (
          <button className="logoutBtn" onClick={() => logout()}></button>
        )}
      </nav>
    );
  }
}

export default NavBar;
