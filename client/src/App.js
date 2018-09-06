import React, { Component } from "react";
import Home from "./Home.js";
import Comment from "./Comment.js";
import axios from "axios";
import countdown from "countdown";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
let afternoonClass = n => {
  var d = new Date();
  d.setHours(n + 12);
  d.setMinutes(30);
  d.setSeconds(0);
  return d;
};
let morningClass = n => {
  var d = new Date();
  d.setHours(n);
  d.setMinutes(0);
  d.setSeconds(0);
  return d;
};

class App extends Component {
  countdownToClass = now => {
    this.setState({
      Five30Class: Math.round(
        countdown(now, afternoonClass(5), countdown.MINUTES).value / 1000 / 60
      ),
      Four30Class: Math.round(
        countdown(now, afternoonClass(4), countdown.MINUTES).value / 1000 / 60
      ),
      Six30Class: Math.round(
        countdown(now, afternoonClass(6), countdown.MINUTES).value / 1000 / 60
      ),
      SixAMClass: Math.round(
        countdown(now, morningClass(6), countdown.MINUTES).value / 1000 / 60
      ),
      SevenAMClass: Math.round(
        countdown(now, morningClass(7), countdown.MINUTES).value / 1000 / 60
      ),
      NineAMClass: Math.round(
        countdown(now, morningClass(9), countdown.MINUTES).value / 1000 / 60
      ),
      NoonClass: Math.round(
        countdown(now, morningClass(12), countdown.MINUTES).value / 1000 / 60
      ),
      SatFirstClass: Math.round(
        countdown(now, afternoonClass(-20), countdown.MINUTES).value / 1000 / 60
      ),
      SatSecondClass: Math.round(
        countdown(now, morningClass(10), countdown.MINUTES).value / 1000 / 60
      )
    });
  };

  willIbeOnTime = location => {
    axios
      .get(`/trip-duration/${location}`)
      .then(response => {
        this.setState({ tripDuration: Math.round(response.data.value / 60) });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  };

  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={`/`}
            render={() => (
              <Home
                onTime={this.willIbeOnTime}
                location={this.getLocation}
                duration={this.state.tripDuration}
                nextClass={this.countdownToClass}
                NoonClassIs={this.state.NoonClass}
                Five30ClassIs={this.state.Five30Class}
                Six30ClassIs={this.state.Six30Class}
                Four30ClassIs={this.state.Four30Class}
                SixAMClassIs={this.state.SixAMClass}
                SevenAMClassIs={this.state.SevenAMClass}
                NineAMClassIs={this.state.NineAMClass}
                SatFirstClassIs={this.state.SatFirstClass}
                SatSecondClassIs={this.state.SatSecondClass}
                todaysWod={this.todaysWod}
                wods={this.state.wods}
              />
            )}
          />
          <Route path={`/comment`} render={() => <Comment />} />
          {/* <Route component={RouteError} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
