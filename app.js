// Import env variable
require("dotenv").config({ path: "./config/config.env" });

// Imports
const express = require("express");
const connectToDataBase = require("./config/db");

// Import Routers
const authenticationRouter = require("./modules/Authentication/authenticationRouter");
const carRouter = require("./modules/Car/carRouter");
const ownerRouter = require("./modules/Owner/ownerRouter");
const insuranceRouter = require("./modules/Insurance/insuranceRouter");
const collisionRouter = require("./modules/Collision/collisionRouter");

const app = express();

// Body parser
app.use(express.json());

const port = process.env.PORT || 5000;

// Conect to Data Base
connectToDataBase();

// Routers
app.use("/api/v1/authentication", authenticationRouter);
app.use("/api/v1/car", carRouter);
app.use("/api/v1/owner", ownerRouter);
app.use("/api/v1/insurance", insuranceRouter);
app.use("/api/v1/collision", collisionRouter);

// Handle Error
app.use((err, req, res, next) => {
  // console.log(err);
  res.status(err.statusCode || 500).json({
    success: false,
    data: err.data || {},
    msg: err.msg || "Something went wrong"
  });
});

app.listen(port, () => console.log(`App listetnig on port ${port}`));
