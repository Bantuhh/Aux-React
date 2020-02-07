import React, { Component } from "react";
import "../styles/NavBar.css";

import AuxNavImg from "../resources/images/AuxNavImg.png";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top">
        <a className="navbar-brand" href="/">
          <img src={AuxNavImg} alt="" />
        </a>
      </nav>
    );
  }
}

export default NavBar;
