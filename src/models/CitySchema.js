const mongoose = require("mongoose");

const Stop = {
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
  cityId : {
    type:Number,
    required : true
  },
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
  stops: [Stop],
});

const City = mongoose.model("City", citySchema);

module.exports = City;
