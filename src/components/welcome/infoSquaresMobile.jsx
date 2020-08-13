import React, { Component } from "react";

import "../../styles/WelcomeMobile.css";
import ChooseYourMusicImg from "../../resources/images/ChooseYourMusicImg.png";
import ListenTogetherImg from "../../resources/images/ListenTogetherImg.png";
import AllOnAuxImg from "../../resources/images/AllOnAuxImg.png";

import Fade from "react-reveal/Fade";

class InfoSquaresMobile extends Component {
  state = {};
  render() {
    return (
      <div className="infoSquareContainer">
        <Fade bottom>
          <div className="infoSquare1">
            <img
              className="ChooseYourMusicImg"
              src={ChooseYourMusicImg}
              alt=""></img>
          </div>
        </Fade>
        <Fade bottom>
          <div className="infoSquare2"></div>
        </Fade>
        <Fade bottom>
          <div className="infoSquare3"></div>
        </Fade>

        <Fade bottom>
          <div className="infoSquare4">
            <img
              className="ListenTogetherImg"
              src={ListenTogetherImg}
              alt=""></img>
          </div>
        </Fade>
        <Fade bottom>
          <div className="infoSquare5"></div>
        </Fade>

        <Fade bottom>
          <div className="infoSquare6">
            <img className="AllOnAuxImg" src={AllOnAuxImg} alt=""></img>
          </div>
        </Fade>

        <div className="botPad"></div>
      </div>
    );
  }
}

export default InfoSquaresMobile;
