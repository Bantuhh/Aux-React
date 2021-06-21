import React, { Component } from 'react';       

import "../styles/BottomNavBar.css";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

class BottomNavBar extends Component {
    state = {  }
    render() { 
        return ( <div id="NavBarContainer"> 
                    <div id="innerNavDiv">
                        <div id="Tab" onClick={() => this.props.onBottomTabSelect("Session")}>
                            <i 
                            id="TabIcon"
                            className="fa fa-fw fa-play-circle"
                            style={{ fontSize: "3.4vh"}}
                            />
                            <p id="TabText">Session</p>
                        </div>
                        <div id="TabDivider"></div>
                        <div id="Tab" onClick={() => this.props.onBottomTabSelect("Search")}>
                            <i 
                            id="TabIcon"
                            className="fa fa-fw fa-search"
                            style={{ fontSize: "3.4vh"}}
                            />
                            <p id="TabText">Search</p>
                        </div>
                        <div id="TabDivider"></div>
                        <div id="Tab" onClick={() => this.props.onBottomTabSelect("Library")}>
                            <i 
                            id="TabIcon"
                            className="fa fa-fw fa-book"
                            style={{ fontSize: "3.4vh"}}
                            />
                            <p id="TabText">Library</p>
                        </div>
                        <div id="TabDivider"></div>
                        <div id="Tab" onClick={() => this.props.onBottomTabSelect("Accounts")}>
                            <i 
                            id="TabIcon"
                            className="fa fa-fw fa-user-circle"
                            style={{ fontSize: "3.4vh"}}
                            />
                            <p id="TabText">Profiles</p>
                        </div>
                    </div>
                </div> );
    }
}
 
export default BottomNavBar;