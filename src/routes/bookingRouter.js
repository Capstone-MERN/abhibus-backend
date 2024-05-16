const express = require('express');
const BookingRouter = express.Router();
const isAuth = require('../middleware/isAuth'); 
const { findTourById, createBooking } = require('../services/bookingService'); 

BookingRouter.post("/book", isAuth, async (req, res) => {
  try {
    const { tourId, seats } = req.body;

    if (!tourId || !seats || seats.length === 0) {
      return res.status(400).json({
        message: "Invalid request",
      });
    }

    const tour = await findTourById(tourId);
    if (!tour) {
      return res.status(400).json({
        message: "Tour not found",
      });
    }

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

    res.status(201).json({
      message: "Booking Successful",
      data: newBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = BookingRouter;

