import React, { Component } from "react";
import Header from "./Header.js";
import countdown from "countdown";
import FacebookProvider, { Page } from "react-facebook";
import axios from "axios";

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
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      wods: [],
      posted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //gets location as soon as component loads
  componentDidMount() {
    this.todaysWod();
    getLocation();
    this.setState({ today: today() });
  }
  //stops page from refreshing on submit, runs onTime with current location parameters
  handleSubmit = e => {
    e.preventDefault();
    this.props.nextClass(null);
    this.props.onTime(location);
  };
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  submitComment = e => {
    e.preventDefault();
    axios
      .post("/review", {
        review: this.state.value
      })
      .then(function(response) {
        console.log(response.body);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({ posted: true });
  };
  todaysWod = () => {
    axios
      .get(`/wod`)
      .then(response => {
        this.setState({ wods: response.data.data });
        console.log(this.state.wods);
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
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
                <ul className="list-group list-group-flush" id="classes">
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
                <ul className="list-group list-group-flush  " id="classes">
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
                <ul className="list-group list-group-flush " id="classes">
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
                className="mt-3"
              />
            </FacebookProvider>
          </div>

          <div className="card col-lg-3 bg-dark text-center">
            <div className="card-header bg-primary text-white mt-3">
              Today's WOD
            </div>
            <div id="highfive" className="mb-3">
              {this.state.wods.map((wod, index) => (
                <div className="card-body bg-light ">
                  <h6 className="card-title bg-primary rounded-top text-white mb-0 p-2">
                    <strong>{wod.attributes.title}</strong>
                  </h6>
                  <p className="card-text bg-dark text-white border border-primary rounded-bottom">
                    {wod.attributes.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container card-columns ml-auto mr-auto mt-5 row d-flex justify-content-around ">
          <div className="card col-lg-6 bg-dark text-center">
            {this.state.posted === false ? (
              <div className="card-body bg-dark text-white mb-5">
                <h5 className="card-title mb-5">
                  Leave a comment or suggestion!
                </h5>
                <form onSubmit={this.submitComment}>
                  <div class="form-group">
                    <input
                      type="text"
                      value={this.state.value}
                      onChange={this.handleChange}
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      placeholder="Type something..."
                      rows="3"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send it!
                  </button>
                </form>
              </div>
            ) : (
              <div className="card-body bg-dark text-white mb-5">
                <h5 className="card-title mb-5">Thank you!</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
