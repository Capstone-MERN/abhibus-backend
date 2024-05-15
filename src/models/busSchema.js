const mongoose = require("mongoose");
const constants = require("../utils/constants");

const Seat = {
  row: { type: Number, required: true },
  column: { type: Number, required: true },
  seatNumber: { type: String, required: true },
  seatType: {
    type: String,
    enum: constants.seatTypes,
    required: true,
  },
};

const busSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  plateNumber: { type: String, required: true },
  busType: { type: String, enum: constants.busTypes, required: true },
  seatLayout: {
    lowerDeck: [Seat],
    upperDeck: [Seat],
  },
  partner: { type: String, required: true },
  amenities: [
    {
      icon: { type: String, required: true },
      label: { type: String, required: true },
    },
  ],
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
