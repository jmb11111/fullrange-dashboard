import React, { Component } from "react";
import Header from "./Header.js";

class Comment extends Component {
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
              <form>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">
                    Example textarea
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Show Me!
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
