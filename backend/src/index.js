const express = require("express");
const route = require("./routes/route");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

app.use(express.json());
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3001, function () {
  console.log("Express app running on port " + (process.env.PORT || 3001));
});
