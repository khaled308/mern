const mongoose = require("mongoose");

const connectToDB = async () => {
  mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));
};

module.exports = connectToDB;
