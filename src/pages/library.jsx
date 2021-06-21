import React, { Component } from "react";

import MediaQuery from "react-responsive";

import NavBar from "../components/navbar";

import LibraryWeb from "../components/library/libraryWeb";
import LibraryMobile from "../components/library/libraryMobile";

class Library extends Component {
  render() {
    return (
      <div class="library">
        

        <MediaQuery query="(min-device-width: 1025px)">
        <NavBar></NavBar>
        <LibraryWeb></LibraryWeb>
          {/* <MediaQuery query="(min-width: 1225px)">
            <LibraryWeb></LibraryWeb>
          </MediaQuery>
          <MediaQuery query="(max-width: 1224px)">
            <LibraryWeb></LibraryWeb>
          </MediaQuery> */}
        </MediaQuery>

        <MediaQuery query="(max-device-width: 1024px)">
        <LibraryMobile></LibraryMobile>
          {/* <MediaQuery query="(min-device-width: 1024px)">
            <LibraryMobile></LibraryMobile>
          </MediaQuery>

          <MediaQuery query="(max-device-width: 1023px)">
            <LibraryMobile></LibraryMobile>
          </MediaQuery> */}
        </MediaQuery>
      </div>
    );
  }
}

export default Library;
