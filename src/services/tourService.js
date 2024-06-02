const City = require("../models/CitySchema");
const Bus = require("../models/busSchema");
const Tour = require("../models/tourSchema");
const Booking = require("../models/bookingSchema");

const calculateDuration = (startTime, endTime) => {
  // TODO: convert the seconds into `2d 3h 50m`
  const duration = endTime - startTime;
  return duration;
};

const getBookedSeatsByTourId = async (tourId) => {
  const bookings = await Booking.find({ tourId }, { bookedSeats: 1 });
  const bookedSeats = bookings.reduce(
    (acc, booking) => acc + booking.bookedSeats.length,
    0
  );
  return bookedSeats;
};

const findTours = async (cityId1, cityId2, travelDate) => {
  try {
    // FIXME: everything should be dealed with millis.
    const startOfDay = new Date(travelDate).setHours(0, 0, 0, 0);
    const endOfDay = new Date(travelDate).setHours(23, 59, 59, 999);

    // current epoch time
    const currentTime = Math.floor(Date.now());

    let query = {
      "source.cityId": cityId1,
      "destination.cityId": cityId2,
      travelDate: { $gte: startOfDay, $lte: endOfDay },
    };

    // If the travel date is today
    const today = Math.floor(new Date().setHours(0, 0, 0, 0));
    if (travelDate === today) {
      query["source.stops.0.arrivalTime"] = { $gte: currentTime };
    }

    const tours = await Tour.find(query);
    const busIds = tours.map((tour) => tour.busId);

    const results = [];

    const buses = await Bus.find(
      { id: { $in: busIds } },
      { busType: 1, partner: 1, amenities: 1, _id: 0, seatLayout: 1, id: 1 }
    );

    const busMapping = new Map();
    buses.forEach((bus) => {
      busMapping.set(bus.id, {
        busType: bus.busType,
        partner: bus.partner,
        amenities: bus.amenities,
        totalSeats:
          (bus.seatLayout?.upperDeck?.length ?? 0) +
          bus.seatLayout.lowerDeck.length,
      });
    });

    for (const tour of tours) {
      const bus = busMapping.get(tour.busId);
      const bookedSeats = await getBookedSeatsByTourId(tour.id);
      const availableSeats = bus.totalSeats - bookedSeats;

      let minPrice = Number.MAX_SAFE_INTEGER,
        maxPrice = 0;

      tour.prices.forEach(({ price }) => {
        if (price > maxPrice) maxPrice = price;
        if (price < minPrice) minPrice = price;
      });

      const response = {
        busId: tour.busId,
        tourId: tour.id,
        busType: bus.busType,
        busPartner: bus.partner,
        amenities: bus.amenities,
        startTime: tour.source.stops[0].arrivalTime,
        endTime: tour.destination.stops[0].arrivalTime,
        duration: calculateDuration(
          tour.source.stops[0].arrivalTime,
          tour.destination.stops[0].arrivalTime
        ),
        availableSeats,
        minPrice,
        maxPrice,
        sourceStops: tour.source.stops,
        destinationStops: tour.destination.stops,
      };

      results.push(response);
    }

    return results;
  } catch (error) {
    console.error("Error fetching tours:", error);
    throw error;
  }
};

const getResponse = async (sourceCityId, destinationCityId, date) => {
  const filter = { city: 1, stops: { stopId: 1, directions: 1, name: 1 } };
  const sourceCity = await City.findOne({ cityId: sourceCityId }, filter);
  const destinationCity = await City.findOne(
    { cityId: destinationCityId },
    filter
  );
  const tours = await findTours(sourceCityId, destinationCityId, date);

  const response = {
    sourceCity: sourceCity.city,
    destinationCity: destinationCity.city,
    // FIXME: exclude _id property for all the stops
    boardingPoints: sourceCity.stops,
    droppingPoints: destinationCity.stops,
    tours: tours,
  };

  return response;
};

module.exports = { getResponse };
