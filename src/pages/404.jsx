import React, { Component } from "react";

import { Link } from "react-router-dom";

class NotFoundPage extends Component {
  render() {
    return (
      <div id="404" style={{ backgroundColor: "#252525" }}>
        <h3>404: Page not found.</h3>
        <Link to="/">Go to home page</Link>
      </div>
    );
  }
}

export default NotFoundPage;
