require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// Connection to database
const connectDB = require("./config/dbConfig");
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

// Routes
const apiRoute = require("./routes");
const indexRoute = (req, res) => {
  res.status(200).json({ success: true, message: "Welcome" });
};

app.use("/api", apiRoute);
app.use("/", indexRoute);

// Starting server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
