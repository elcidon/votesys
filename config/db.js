const mongoose = require("mongoose");
const config = require("config");
const env = config.get("ENVIRONMENT");

let db = config.get("mongoURI");

if (env === "dev") {
  db = config.get("mongoLocalURI");
}

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.info("Mongo connected");
  } catch (err) {
    console.log(err.message);
    // Exit
    process.exit(1);
  }
};
module.exports = connectDB;
