const seatTypes = ["SLEEPER", "SEATER", "SEMI_SLEEPER"];
const tourPlaces = {
  cityId: { type: Number, required: true },
  stops: [
    {
      stopId: { type: Number, required: true },
      arrivalTime: { type: Number, required: true },
    },
  ],
};
const busTypes = ["AC", "NON_AC"];
module.exports = {
  seatTypes: seatTypes,
  tourPlaces: tourPlaces,
  busTypes: busTypes,
};
