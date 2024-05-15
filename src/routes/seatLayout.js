const { seatLayoutEndPoint } = require("../endpoints");
const {
  findBusById,
  getSeatLayout,
  getBookedSeats,
} = require("../services/seatLayoutServices");

const router = require("express").Router();

//Endpoint for the seatLayout
router.get(seatLayoutEndPoint, async (req, resp) => {
  const { busId, tourId } = req.query;
  try {
    const bus = await findBusById(busId);
    if (!bus) {
      return resp.status(404).json({ message: "Bus not Found!" });
    }
    const seatLayout = await getSeatLayout(bus);
    if (!seatLayout) {
      return resp
        .status(404)
        .json({ message: "Seat Layout unavailable for this bus" });
    }
    const prices = await getSeatPrices(tourId);
    if (!prices) {
      return resp.status(404).json({
        message: "tour not found",
      });
    }
    const bookedSeats = await getBookedSeats(tourId);
    return resp.status(200).json({
      seatLayout: seatLayout,
      prices: prices,
      bookedSeats: bookedSeats,
    });
  } catch (error) {
    return resp.status(500).json({ error: "Internal Server Error" });
  }
});
