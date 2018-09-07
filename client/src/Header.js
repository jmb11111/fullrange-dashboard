import React, { Component } from "react";
import axios from "axios";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: ""
    };
  }

  currentWeather = () => {
    axios
      .get(`/weather`)
      .then(response => {
        this.setState({ temp: response.data });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  };

  componentDidMount() {
    this.currentWeather();
  }
  render() {
    return (
      <nav
        className="navbar navbar-expand-md navbar-fixed-top navbar-dark bg-dark
            main-nav"
      >
        <div className="container">
          <ul className="nav navbar-nav mr-auto ml-md-auto">
            <li className="nav-item active">
              <a className="nav-link" href="https://fullrangecrossfit.com">
                Main Site
              </a>
            </li>
          </ul>
          <ul className="nav navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                <img
                  src="/download.png"
                  className="logo
                                rounded-circle img-fluid"
                  width="100"
                  alt="logo"
                />
              </a>
            </li>
          </ul>
          <ul className="nav navbar-nav ml-auto mr-md-auto">
            <li className="nav-item active">
              <p className="nav-link mb-0" href="/comment">
                Current Temp {this.state.temp}
                 °F
              </p>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
