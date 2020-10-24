import React, { Component } from "react";

import "../../styles/LibraryResults.css";

import LibraryItem from "./libraryItem";

import PlaylistItem from "./playlistItem";

class LibraryResults extends Component {
  state = {};

  render() {
    const { selectedTab, libraryPullResults } = this.props;

    var libraryPullResultsArray = [];
    for (var key in libraryPullResults) {
      libraryPullResultsArray.push(libraryPullResults[key]);
    }

    return (
      <div className="libraryDiv">
        {selectedTab === "Favorites"
          ? libraryPullResultsArray.map((item) => (
              <LibraryItem
                songInfo={item}
                addSongToQueue={() =>
                  this.props.addSongToQueue(
                    "Spotify",
                    Object.assign({}, item).track
                  )
                }
                playSongNow={() =>
                  this.props.playSongNow(Object.assign({}, item))
                }
                showSongOptions={() =>
                  this.props.showSongOptions(Object.assign({}, item))
                }
              />
            ))
          : libraryPullResultsArray.map((item) => (
              <PlaylistItem
                playlistInfo={item}
                showPlaylist={() => this.props.showPlaylist(item)}
              />
            ))}
      </div>
    );
  }
}

export default LibraryResults;
