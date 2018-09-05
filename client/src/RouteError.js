import React, { Component } from "react";

class RouteError extends Component {
  render() {
    return (
      <div className="photo-container">
        <h2>Sorry!</h2>
        <ul>
          <li className="not-found">
            <h3>Error 404</h3>
            <p>Nothing found at this link!</p>
          </li>
        </ul>
      </div>
    );
  }
}

export default RouteError;
