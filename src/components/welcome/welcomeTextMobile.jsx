import React, { Component } from "react";

import "../../styles/WelcomeMobile.css";

import Fade from "react-reveal/Fade";

import downArrow from "../../resources/images/downArrow.png";

class WelcomeTextMobile extends Component {
  state = {};
  render() {
    return (
      <div class="WelcomeTextMobile">
        <Fade>
          <h1>Welcome to Aux.</h1>
        </Fade>
        <Fade bottom>
          <hr />
        </Fade>
        <Fade bottom>
          <h3>A group listening experience where no one gives up the aux.</h3>
        </Fade>
        <Fade bottom>
          <div className="imgContainerMobile">
            <img className="downArrow" src={downArrow} alt="" />
          </div>
        </Fade>
      </div>
    );
  }
}

export default WelcomeTextMobile;
