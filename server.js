const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

app.use("/uploads", express.static("uploads")); // access permission
app.use(bodyParser.json());
app.use("/api", require("./routes/api"));

app.use((err, req, res, next) => {
  res.status(422).send({ error: err._message });
});

app.listen(PORT, () => {
  console.log(`SERVER IS READY ON PORT ${PORT}!`);
});
