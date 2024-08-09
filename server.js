const app = require("./app");
const connectDB = require("./config/database");

const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "config/config.env") });

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`App listen on ${process.env.PORT}`);
});
