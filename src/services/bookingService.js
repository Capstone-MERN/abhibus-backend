const Booking = require("../models/bookingSchema");
const Tour = require("../models/tourSchema")

const createBooking = async (bookingData) => {
  try {
    const booking = new Booking(bookingData);
    return await booking.save();
  } catch (error) {
    throw new Error(`Failed to create booking: ${error.message}`);
  }
};

const findTourById = async(tourId) => {
  try {
    const tour = await Tour.findOne({ id: tourId });
    return tour;
  } catch (error) {
    throw new Error(`Error finding tour: ${error.message}`);
  }
}

const getResponse = async(tourId, seats) =>{
  const tour = await findTourById(tourId);

    // Map of seat prices
    const seatPriceMap = new Map();
    tour.prices.forEach(priceInfo => {
      seatPriceMap.set(priceInfo.seatNumber, priceInfo.price);
    });

    const bookedSeats = seats.map(seat => {
      const price = seatPriceMap.get(seat.seatNumber);
      return {
        seatNumber: seat.seatNumber,
        gender: seat.gender,
        name: seat.name,
        age: seat.age,
        paidPrice: price,
      };
    });

    const bookingTime = Math.floor(Date.now() / 1000);

    const bookingData = {
      bookingTime,
      bookedSeats,
      tourId,
      userId: req.user._id,
    };

    const newBooking = await createBooking(bookingData);

    return newBooking;
}
module.exports = { createBooking, findTourById, getResponse};
