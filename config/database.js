const mongoose = require("mongoose");

/**
 * Connects to the MongoDB database using the provided URI.
 *
 * @return {Promise<void>} A promise that resolves when the connection is established.
 */
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`MongoDB connected to : ${con.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
