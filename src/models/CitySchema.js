const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  stopId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  directions: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  latitude: Number,
  longitude: Number,
});

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
  stops: [stopSchema],
});

module.exports = mongoose.model("City", citySchema);
