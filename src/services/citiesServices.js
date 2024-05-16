const City = require("../models/CitySchema");

async function findCities() {
  try {
    const cities = await City.find();
    return cities;
  } catch (error) {
    throw new Error("Failed to fetch cities");
  }
}
module.exports = findCities;
