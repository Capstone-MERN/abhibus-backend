const { layout } = require("../endpoints");
const {
  findBusById,
  getBookedSeats,
  getSeatPrices,
} = require("../services/busService");

const router = require("express").Router();

//Endpoint for the seatLayout
router.get(layout, async (req, resp) => {
  const { busId, tourId } = req.query;

  try {
    const bus = await findBusById(busId);
    const pricesMap = await getSeatPrices(tourId);
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

    const response = {
      layout: {
        upperDeck: bus.seatLayout.upperDeck?.map(createDeckResponse),
        lowerDeck: bus.seatLayout.lowerDeck?.map(createDeckResponse),
      },
    };
    return resp.status(200).json(response);
  } catch (error) {
    return resp.status(500).json({ error: error.message });
  }
});

module.exports = router;
