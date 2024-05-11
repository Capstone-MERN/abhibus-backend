const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  source: {
    cityId: { type: Number },
    stops: [
      {
        stopId: Number,
        arrivalTime: Number,
      },
    ],
  },
  destination: {
    cityId: { type: Number },
    stops: [
      {
        stopId: Number,
        arrivalTime: Number,
      },
    ],
  },
  travelDate: Number,
  busId: { type: Number },
  prices: [
    {
      seatNumber: String,
      price: Number,
    },
  ],
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
