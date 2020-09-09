import React, { Component } from "react";

import "../../styles/SearchResults.css";

import SearchItem from "./searchItem";

class SearchResults extends Component {
  state = {};
  render() {
    const { trackSearchResults } = this.props;

    var trackSearchResultsArray = [];
    for (var key in trackSearchResults) {
      trackSearchResultsArray.push(trackSearchResults[key]);
    }

    return (
      <div className="searchDiv">
        {trackSearchResultsArray.map((item) => (
          <SearchItem
            songInfo={item}
            showSongOptions={() =>
              this.props.showSongOptions(Object.assign({}, item))
            }
          />
        ))}
      </div>
    );
  }
}

export default SearchResults;
