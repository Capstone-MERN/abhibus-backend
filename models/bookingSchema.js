const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingTime: Number,
  bookedSeats: [
    {
      seatNumber: String,
      gender: { type: String, enum: ["M", "F"] },
      name: String,
      age: Number,
      paidPrice: Number,
    },
  ],
  tourId: { type: Number, ref: "Tour" },
  userId: { type: Number, ref: "User" },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
