require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./db");
const { userRoutes } = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const morgan = require("morgan");

const app = express();

dbConnection();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", userRoutes);

app.use(errorHandler);
app.listen(process.env.PORT || 8000);
