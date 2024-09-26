const express = require("express");
const dbConnection = require("./config/db");
const Config = require("./config");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = Config.PORT || 5000;

// Middleware to parse incoming JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// dbConnection
dbConnection();

// API routes

app.listen(PORT, (err) => {
  if (err) {
    console.log(err, "Server is not connected");
  }
  console.log(`Listening on port : http://localhost:${PORT}`);
});
