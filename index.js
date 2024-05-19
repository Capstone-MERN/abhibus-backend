require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDataBaseServer = require("./src/utils/connection.js");
const mainRouter = require("./src/routes/cities.js");
const busRouter = require("./src/routes/bus.js");
const AuthRouter = require("./src/routes/AuthRouter");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.use("", mainRouter);
app.use("/bus", busRouter);
app.use("/auth", AuthRouter);

connectDataBaseServer();

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
