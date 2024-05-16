const City = require('../models/CitySchema');
const Bus = require('../models/busSchema')
const Tour = require('../models/tourSchema')
const Booking = require('../models/bookingSchema')

const findStopPointsByCityId = async (cityId) => {
    try {
        const city = await City.findOne({ cityId: cityId });
        if (!city) {
            throw new Error('City not found');
        }
        return city.stops.map(stop => ({
            stopId: stop.stopId,
            directions : stop.directions,
            name: stop.name
        }));
    } catch (error) {
        throw new Error(`Error finding stop points for cityId ${cityId}: ${error.message}`);
    }
};


const findCityName = async(cityId) => {
    try{
      const city = await City.findOne({ cityId: cityId });
    if(!city){
        throw new Error('City not found');
    }
    return city.name;
    } catch(error){
      throw new Error(`Error finding the city for cityId ${cityId} : ${error.message}`);
    }
}    



const calculateDuration = (startTime, endTime) => {
    const duration = endTime - startTime; 
    return duration / (1000 * 60); 
};
  
  
const calculateAvailableSeats = async (tourId, bus) => {
    const bookings = await Booking.find({ tourId });
    const bookedSeats = bookings.reduce((acc, booking) => acc + booking.bookedSeats.length, 0);
    const totalSeats = bus.seatLayout.lowerDeck.length + bus.seatLayout.upperDeck.length;
    return totalSeats - bookedSeats;
};


const findTours = async (cityId1, cityId2, travelDate) => {
    try {
      
      const startOfDay = new Date(travelDate * 1000).setHours(0, 0, 0, 0) / 1000;
      const endOfDay = new Date(travelDate * 1000).setHours(23, 59, 59, 999) / 1000;
  
      // current epoch time
      const currentTime = Math.floor(Date.now() / 1000);

      let query = {
        'source.cityId': cityId1,
        'destination.cityId': cityId2,
        travelDate: { $gte: startOfDay, $lte: endOfDay }
      };
  
      // If the travel date is today
      const today = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);
      if (travelDate === today) {
        query['source.stops.0.arrivalTime'] = { $gte: currentTime };
      }
  
      const tours = await Tour.find(query);
  
      const results = [];
  
      for (const tour of tours) {
        //  bus data
        const bus = await Bus.findOne({ id: tour.busId });
        // bookings for the tour
        const availableSeats = await calculateAvailableSeats(tour.id, bus);
        
        const response = {
          busId: tour.busId,
          tourId: tour.id,
          busType: bus.busType,
          busPartner: bus.partner,
          amenities: bus.amenities.map(a => a.label),
          startTime: tour.source.stops[0].arrivalTime,
          endTime: tour.destination.stops[0].arrivalTime,
          duration: calculateDuration(tour.source.stops[0].arrivalTime, tour.destination.stops[0].arrivalTime),
          availableSeats,
          minPrice: Math.min(...tour.prices.map(p => p.price)),
          maxPrice: Math.max(...tour.prices.map(p => p.price)),
          sourceStops: tour.source.stops,
          destinationStops: tour.destination.stops,
        };
  
        results.push(response);
      }
  
      return results;
    } catch (error) {
      console.error('Error fetching tours:', error);
      throw error;
    }
  };
  

module.exports = {
    findStopPointsByCityId, 
    findTours,
    findCityName
};



