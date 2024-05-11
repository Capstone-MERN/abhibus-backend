const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
  plateNumber: {
    type: String,
    required: true,
    unique: true,
  },
  busType: {
    type: String,
    enum: ["AC", "NON_AC"],
    required: true,
  },
  seatLayout: {
    isDoubleDecker: {
      type: Boolean,
      default: false,
    },
    lower_deck: [
      {
        seatNumber: {
          type: String,
          required: true,
        },
        row: {
          type: Number,
          required: true,
        },
        column: {
          type: Number,
          required: true,
        },
        seatType: {
          type: String,
          enum: ["SLEEPER", "SEATER", "SEMI_SLEEPER"],
          required: true,
        },
      },
    ],
    upper_deck: [
      {
        seatNumber: {
          type: String,
          required: true,
        },
        row: {
          type: Number,
          required: true,
        },
        column: {
          type: Number,
          required: true,
        },
        seatType: {
          type: String,
          enum: ["SLEEPER", "SEATER", "SEMI_SLEEPER"],
          required: true,
        },
      },
    ],
  },
  partner: {
    type: String,
    required: true,
  },
  amenities: [
    {
      icon: String,
      label: String, 
    },
  ],
});

module.exports = mongoose.model("Bus", BusSchema); 
