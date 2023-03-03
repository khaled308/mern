const mongoose = require("mongoose");

const dbConnection = async () => {
  mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("connection done"))
    .catch((err) => console.log(err));
};

module.exports = dbConnection;
