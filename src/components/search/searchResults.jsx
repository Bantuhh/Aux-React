import React, { Component } from "react";

import "../../styles/SearchResults.css";

import SearchItem from "./searchItem";

class SearchResults extends Component {
  state = {};
  render() {
    const {
      trackSearchResults,
      youtubeSearchResults,
      selectedPlatform,
    } = this.props;

    // Turn Track results object into an array
    var trackSearchResultsArray = [];
    for (var key in trackSearchResults) {
      trackSearchResultsArray.push(trackSearchResults[key]);
    }

    // Turn Video results object into an array
    var youtubeSearchResultsArray = [];
    for (var key_ in youtubeSearchResults) {
      youtubeSearchResultsArray.push(youtubeSearchResults[key_]);
    }

    return (
      <div className="searchDiv">
        {this.props.selectedPlatform === "Youtube"
          ? youtubeSearchResultsArray.map((item) => (
              <SearchItem
                selectedPlatform={selectedPlatform}
                vidInfo={item}
                addSongToQueue={() =>
                  this.props.addSongToQueue("Youtube", Object.assign({}, item))
                }
                playSongNow={() =>
                  this.props.playSongNow(Object.assign({}, item))
                }
                showContentOptions={() =>
                  this.props.showContentOptions(Object.assign({}, item))
                }
              />
            ))
          : trackSearchResultsArray.map((item) => (
              <SearchItem
                selectedPlatform={selectedPlatform}
                songInfo={item}
                addSongToQueue={() =>
                  this.props.addSongToQueue("Spotify", Object.assign({}, item))
                }
                playSongNow={() =>
                  this.props.playSongNow(Object.assign({}, item))
                }
                showContentOptions={() =>
                  this.props.showContentOptions(Object.assign({}, item))
                }
              />
            ))}
      </div>
    );
  }
}

export default SearchResults;
