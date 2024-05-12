const mongoose = require("mongoose");
const constants = require("./constants");

const tourSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  source: constants.tourPlaces,
  destination: constants.tourPlaces,
  travelDate: { type: Number, required: true },
  busId: { type: Number, required: true },
  prices: [
    {
      seatNumber: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
