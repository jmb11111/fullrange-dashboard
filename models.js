"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  review: String,
  postedOn: {
    date: {
      type: Date,
      default: Date.now
    }
  }
});

var Review = mongoose.model("Review", ReviewSchema);
module.exports.Review = Review;
