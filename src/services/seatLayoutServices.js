//Function to find bus by Id
async function findBusById(id) {
  const bus = await Bus.find({ id: id });
  return bus;
}

//Function to get the seatLayout
async function getSeatLayout(bus) {
  const seatLayout = {};
  if (bus.seatLayout.upperDeck && bus.seatLayout.upperDeck.length > 0) {
    seatLayout.upperDeck = bus.seatLayout.upperDeck;
  }
  if (bus.seatLayout.lowerDeck && bus.seatLayout.lowerDeck.length > 0) {
    seatLayout.lowerDeck = bus.seatLayout.lowerDeck;
  }
  return seatLayout;
}

//Function to get the prices of the seats
async function getSeatPrices(id) {
  const tour = await Tour.find({ tourId: id });
  return tour.prices;
}

//Function to get the booked seats
async function getBookedSeats(id) {
  const bookedSeats = await Booking.find({ id: id });
  return { bookedSeat: bookedSeats.seatNumber, gender: bookedSeats.gender };
}

module.exports = { findBusById, getSeatLayout, getSeatPrices, getBookedSeats };
