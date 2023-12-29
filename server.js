import express from "express";
import bodyParser from "body-parser";
import apiRoute from "./routes/api.js";
import userRoute from "./routes/user.js";
import { PORT } from "./config/environments.js";
import "./config/db.js";

const app = express();

app.use("/uploads", express.static("uploads")); // access permission
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", (req, res, next) => {
  console.log("user route");
  res.status(200).send("user route");
  next();
});
app.use("/", apiRoute);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err._message });
});

app.listen(PORT, () => {
  console.log(`==========> SERVER IS READY ON PORT ${PORT}!`);
});
