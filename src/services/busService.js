const Tour = require("../models/tourSchema");
const Booking = require("../models/bookingSchema");
const Bus = require("../models/busSchema");

//Function to find bus by Id
async function findBusById(busId) {
  return await Bus.findOne({ id: busId }, { seatLayout: 1, _id: 0 });
}

//Function to get the prices of the seats
async function getSeatPrices(tourId) {
  const tour = await Tour.findOne(
    { id: tourId },
    { prices: 1, _id: 0, busId: 1 }
  );
  const pricesMap = new Map();
  tour.prices.forEach((seat) => {
    pricesMap.set(seat.seatNumber, seat.price);
  });
  return { pricesMap, busId: tour.busId };
  // { "L4": 3000, "L5": 2000, "L6": 1500 }
}

//Function to get the booked seats based on tourId
async function getBookedSeats(tourId) {
  const bookings = await Booking.find({ tourId }, { bookedSeats: 1 });
  const allBookings = new Map();
  bookings.forEach((booking) => {
    booking.bookedSeats.forEach((individualBooking) => {
      allBookings.set(individualBooking.seatNumber, individualBooking.gender);
    });
  });

  return allBookings;
  /**
      {
        "L4": "M",
        "L6": "F",
      }
   */
}

async function getSeatLayout(tourId) {
  const { pricesMap, busId } = await getSeatPrices(tourId);
  const bus = await findBusById(busId);
  const bookedSeats = await getBookedSeats(tourId);

  const createDeckResponse = (seat) => {
    const seatNumber = seat.seatNumber;
    return {
      row: seat.row,
      column: seat.column,
      seatNumber,
      seatType: seat.seatType,
      price: pricesMap.get(seatNumber),
      ...(bookedSeats.get(seatNumber) && {
        gender: bookedSeats.get(seatNumber),
      }),
    };
  };

  return {
    layout: {
      upperDeck: bus.seatLayout.upperDeck?.map(createDeckResponse),
      lowerDeck: bus.seatLayout.lowerDeck?.map(createDeckResponse),
    },
  };
}

module.exports = {
  findBusById,
  getSeatPrices,
  getBookedSeats,
  getSeatLayout,
};
