import mongoose from "mongoose";

import { MONGO_URI } from "./environments.js";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
