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

async function findTourById(tourId) {
  try {
    const tour = await Tour.findOne({ id: tourId });
    return tour;
  } catch (error) {
    throw new Error(`Error finding tour: ${error.message}`);
  }
}

module.exports = { createBooking, findTourById};
