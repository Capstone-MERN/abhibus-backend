const mongoose = require("mongoose");
const constants = require("./constants");

// tourPlaces schema created to avoid repetition
const tourPlacesSchema = {
  cityId: { type: Number, required: true },
  stops: [
    {
      stopId: { type: Number, required: true },
      arrivalTime: { type: Number, required: true },
    },
  ],
};

const tourSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  source: tourPlacesSchema,
  destination: tourPlacesSchema,
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
