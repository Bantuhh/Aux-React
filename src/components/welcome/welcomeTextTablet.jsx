import React, { Component } from "react";

import "../../styles/WelcomeTablet.css";

import Fade from "react-reveal/Fade";

import downArrow from "../../resources/images/downArrow.png";

class WelcomeTextTablet extends Component {
  state = {};
  render() {
    return (
      <div class="WelcomeTextTablet">
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
          <div className="imgContainerTablet">
            <img className="downArrow" src={downArrow} alt="" />
          </div>
        </Fade>
      </div>
    );
  }
}

export default WelcomeTextTablet;
