const { cities } = require("../endpoints");
const router = require("express").Router();
const findCities = require("../services/citiesServices");

router.get(cities, async (req, resp) => {
  try {
    const cities = await findCities();
    return resp.status(200).json({
      cities: cities,
    });
  } catch (error) {
    return resp.status(500).json({
      Error: Error.message,
    });
  }
});
