require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDataBaseServer = require("./src/utils/connection");
const AuthRouter = require("./src/routes/AuthRouter");
const isAuth = require("./src/middleware/isAuth");

const PORT = process.env.PORT || 8080;
const app = express();

const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 && !origin) {
        callback(null, true);
      } else {
        callback(new Error("not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());
connectDataBaseServer();

app.use("/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
