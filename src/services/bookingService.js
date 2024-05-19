const Booking = require("../models/bookingSchema");
const Tour = require("../models/tourSchema");

const saveBookings = async (tourId, userId, seats) => {
  const tour = await Tour.findOne({ id: tourId });

  // Map of seat prices
  const seatPriceMap = new Map();
  tour.prices.forEach(({ seatNumber, price }) => {
    seatPriceMap.set(seatNumber, price);
  });

  const bookedSeats = seats.map((seat) => {
    const price = seatPriceMap.get(seat.seatNumber);
    return {
      seatNumber: seat.seatNumber,
      gender: seat.gender,
      name: seat.name,
      age: seat.age,
      paidPrice: price,
    };
  });

  const bookingTime = Date.now();

  const booking = new Booking({
    bookingTime,
    bookedSeats,
    tourId,
    userId,
  });

  return await booking.save();
};

module.exports = { saveBookings };
