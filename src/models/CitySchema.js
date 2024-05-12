const mongoose = require("mongoose");

const stopsObj = {
  stopId: {
    type: Number,
    required: true,
    unique: true,
  },
  directions: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
};

const citySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  stateCode: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  stops: stopsObj,
});

const City = mongoose.model("City", citySchema);

module.exports = City;
