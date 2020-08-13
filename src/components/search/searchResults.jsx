import React, { Component } from "react";

import "../../styles/SearchResults.css";

import SearchItem from "./searchItem";

class SearchResults extends Component {
  state = {
    queue: [
      {
        songTitle: "Ghost Voices",
        artist: "Virtual Self",
        albumImgURL: require("../../resources/images/GhostVoices.png"),
      },
      {
        songTitle: "Dosas and Mimosas",
        artist: "Cherub",
        albumImgURL: require("../../resources/images/DosasandMimosas.png"),
      },
    ],
  };
  render() {
    const { trackSearchResults } = this.props;

    var trackSearchResultsArray = [];
    for (var key in trackSearchResults) {
      trackSearchResultsArray.push(trackSearchResults[key]);
    }

    return (
      <div className="searchDiv">
        {trackSearchResultsArray.map((item) => (
          <SearchItem songInfo={item} />
        ))}
      </div>
    );
  }
}

export default SearchResults;
