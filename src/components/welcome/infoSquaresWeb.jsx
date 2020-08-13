import React, { Component } from "react";

import "../../styles/WelcomeWeb.css";

import ChooseYourMusicImg from "../../resources/images/ChooseYourMusicImg.png";
import ListenTogetherImg from "../../resources/images/ListenTogetherImg.png";
import AllOnAuxImg from "../../resources/images/AllOnAuxImg.png";

import Fade from "react-reveal/Fade";

class InfoSquaresWeb extends Component {
  state = {};
  render() {
    return (
      <div className="infoSquareContainerWeb">
        <Fade bottom>
          <div className="infoSquareWeb1">
            <img
              className="ChooseYourMusicImg"
              src={ChooseYourMusicImg}
              alt=""></img>
          </div>
        </Fade>

        <Fade bottom>
          <div className="infoSquareWeb2">
            <img
              className="ListenTogetherImg"
              src={ListenTogetherImg}
              alt=""></img>
          </div>
        </Fade>

        <Fade bottom>
          <div className="infoSquareWeb3">
            <img className="AllOnAuxImg" src={AllOnAuxImg} alt=""></img>
          </div>
        </Fade>
      </div>
    );
  }
}

export default InfoSquaresWeb;
