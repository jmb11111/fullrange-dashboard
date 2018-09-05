import React, { Component } from "react";
import Header from "./Header.js";
import countdown from "countdown";
import FacebookProvider, { Page } from "react-facebook";

let location;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      return (location =
        position.coords.latitude.toString() +
        "," +
        position.coords.longitude.toString());
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

let today = () => {
  var d = new Date();
  var n = d.getDay();
  return n;
};
class Home extends Component {
  state = {
    today: ""
  };
  //gets location as soon as component loads
  componentDidMount() {
    getLocation();
    this.setState({ today: today() });
  }
  //stops page from refreshing on submit, runs onTime with current location parameters
  handleSubmit = e => {
    e.preventDefault();

    this.props.nextClass(null);
    this.props.onTime(location);
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container card-columns ml-auto mr-auto mt-5 row d-flex justify-content-between ">
          <div className="card col-lg-3 bg-dark text-center " id="facebook">
            <div className="card-body bg-dark text-white mb-5">
              <h5 className="card-title mb-5">
                What Classes Can I Make It For?
              </h5>
              <form className="mb-3" onSubmit={this.handleSubmit}>
                <button type="submit" className="btn btn-primary">
                  Show Me!
                </button>
              </form>
              {(this.props.duration && this.state.today === 1) ||
              (this.props.duration && this.state.today === 2) ||
              (this.props.duration && this.state.today === 3) ||
              (this.props.duration && this.state.today === 4) ||
              (this.props.duration && this.state.today === 5) ? (
                <ul className="list-group list-group-flush ">
                  <li className="list-group-item active">
                    ETA: {this.props.duration}
                  </li>

                  {this.props.SixAMClassIs > this.props.duration ? (
                    <li className="list-group-item list-group-item-success ">
                      6AM ✓
                    </li>
                  ) : (
                    <li className="list-group-item list-group-item-danger">
                      6AM
                    </li>
                  )}
                  {this.props.SevenAMClassIs > this.props.duration ? (
                    <li className="list-group-item list-group-item-success ">
                      7AM ✓
                    </li>
                  ) : (
                    <li className="list-group-item list-group-item-danger">
                      7AM
                    </li>
                  )}
                  {this.props.NineAMClassIs > this.props.duration ? (
                    <li className="list-group-item list-group-item-success ">
                      9AM ✓
                    </li>
                  ) : (
                    <li className="list-group-item list-group-item-danger">
                      9AM
                    </li>
                  )}
                  {this.state.today === 1 ||
                  this.state.today === 3 ||
                  this.state.today === 4 ? (
                    this.props.NoonClassIs > this.props.duration ? (
                      <li className="list-group-item list-group-item-success ">
                        12PM ✓
                      </li>
                    ) : (
                      <li className="list-group-item list-group-item-danger">
                        12PM
                      </li>
                    )
                  ) : (
                    ""
                  )}
                  {this.props.Four30ClassIs > this.props.duration ? (
                    <li className="list-group-item list-group-item-success ">
                      430 ✓
                    </li>
                  ) : (
                    <li className="list-group-item list-group-item-danger">
                      430
                    </li>
                  )}
                  {this.props.Five30ClassIs > this.props.duration ? (
                    <li className="list-group-item list-group-item-success ">
                      530 ✓
                    </li>
                  ) : (
                    <li className="list-group-item list-group-item-danger">
                      530
                    </li>
                  )}
                  {this.props.Six30ClassIs > this.props.duration ? (
                    <li className="list-group-item list-group-item-success ">
                      630 ✓
                    </li>
                  ) : (
                    <li className="list-group-item list-group-item-danger">
                      630
                    </li>
                  )}
                </ul>
              ) : (
                ""
              )}
              {this.props.duration && this.state.today === 6 ? (
                <ul className="list-group list-group-flush ">
                  <li className="list-group-item active">
                    ETA: {this.props.duration}
                  </li>

                  {this.props.SatFirstClassIs > this.props.duration ? (
                    <li className="list-group-item list-group-item-success ">
                      830AM ✓
                    </li>
                  ) : (
                    <li className="list-group-item list-group-item-danger">
                      830AM
                    </li>
                  )}
                  {this.props.SatSecondClassIs > this.props.duration ? (
                    <li className="list-group-item list-group-item-success ">
                      10AM ✓
                    </li>
                  ) : (
                    <li className="list-group-item list-group-item-danger">
                      10AM
                    </li>
                  )}
                </ul>
              ) : (
                ""
              )}
              {this.props.duration && this.state.today === 0 ? (
                <ul className="list-group list-group-flush ">
                  <li className="list-group-item list-group-item-warning">
                    Sorry, no classes on Sunday!
                  </li>
                </ul>
              ) : (
                ""
              )}
              {!this.props.duration ? (
                <img
                  class="card-img-bottom mt-5 rounded"
                  src="/trafficLight.jpg"
                  alt="lights"
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="card bg-dark  col-lg-4  text-center">
            <FacebookProvider appId="502980866868802">
              <Page
                href="https://www.facebook.com/FullRangeCrossFit/?fb_dtsg_ag=AdwS_WIHC78zl6x8ZqEtUvm0rWfbAME0otphGaxU6Drgtw%3AAdz0CYgdDnHRAqJts48e7M0kmWwKlpzT3dKJ-y-qF1m5ZA"
                tabs="timeline"
                width="280"
              />
            </FacebookProvider>
          </div>

          <div className="card col-lg-3 bg-dark text-center">
            <div className="card-header bg-dark text-white">
              Recent Spotify Songs
            </div>
            <ul className="list-group list-group-flush ">
              <li className="list-group-item">Coming Soon!</li>
              <li className="list-group-item">Coming Soon!</li>
              <li className="list-group-item">Coming Soon!</li>
              <li className="list-group-item">Coming Soon!</li>
              <li className="list-group-item">Coming Soon!</li>
              <li className="list-group-item">Coming Soon!</li>
              <li className="list-group-item">Coming Soon!</li>
              <li className="list-group-item">Coming Soon!</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
