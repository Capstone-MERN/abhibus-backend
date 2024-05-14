const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  city: { type: String, required: true },
  pin_code: { type: Number, required: true },
  state_name: { type: String, required: true },
  state_code: { type: String, required: true }
});

const City = mongoose.model("City", bookingSchema);

module.exports = City;
