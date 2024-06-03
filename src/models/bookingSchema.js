const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingTime: { type: Number, required: true },
  bookedSeats: [
    {
      seatNumber: { type: String, required: true },
      gender: { type: String, enum: ["M", "F"], required: true },
      name: { type: String, required: true },
      age: { type: Number, required: true },
      paidPrice: { type: Number, required: true },
    },
  ],
  tourId: { type: Number, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
