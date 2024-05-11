const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  plateNumber: String,
  busType: { type: String, enum: ["AC", "NON_AC"] },
  seatLayout: {
    lower_deck: [
      {
        row: Number,
        column: Number,
        seatNumber: String,
        seatType: { type: String, enum: ["SLEEPER", "SEATER", "SEMI_SLEEPER"] },
      },
    ],
    upper_deck: [
      {
        row: Number,
        column: Number,
        seatNumber: String,
        seatType: { type: String, enum: ["SLEEPER", "SEATER", "SEMI_SLEEPER"] },
      },
    ],
  },
  partner: String,
  amenities: [{ icon: String, label: String }],
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
