import React, { Component } from "react";

import MediaQuery from "react-responsive";

import NavBar from "../components/navbar";

import SearchWeb from "../components/search/searchWeb";
import SearchMobile from "../components/search/searchMobile";

class Search extends Component {
  render() {
    return (
      <div class="search">
        

        <MediaQuery query="(min-device-width: 1025px)">
        <NavBar></NavBar>
        <SearchWeb></SearchWeb>
          {/* <MediaQuery query="(min-width: 1225px)">
            <SearchWeb></SearchWeb>
          </MediaQuery>
          <MediaQuery query="(max-width: 1224px)">
            <SearchWeb></SearchWeb>
          </MediaQuery> */}
        </MediaQuery>

        <MediaQuery query="(max-device-width: 1024px)">
        <SearchMobile></SearchMobile>
          {/* <MediaQuery query="(min-device-width: 1024px)">
            <SearchMobile></SearchMobile>
          </MediaQuery>

          <MediaQuery query="(max-device-width: 1023px)">
            <SearchMobile></SearchMobile>
          </MediaQuery> */}
        </MediaQuery>
      </div>
    );
  }
}

export default Search;
