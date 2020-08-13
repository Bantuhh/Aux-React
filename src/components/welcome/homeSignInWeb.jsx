import React, { Component } from "react";

import "../../styles/WelcomeWeb.css";

import Fade from "react-reveal/Fade";

import AuxLogoText from "../../resources/images/AuxLogoText.png";

class HomeSignInWeb extends Component {
  state = {};
  render() {
    return (
      <div class="homeSignIn">
        <Fade>
          <div className="logoContainerWeb">
            <img className="AuxLogoText" src={AuxLogoText} alt="" />
          </div>
        </Fade>
        <Fade>
          <hr />
        </Fade>
      </div>
    );
  }
}

export default HomeSignInWeb;
