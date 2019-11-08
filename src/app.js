import express from "express";
import mongoose from "mongoose";
import logger from "morgan";
import cors from "cors";
import { restRouter } from "./api";

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/lms`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection
  .once("open", function() {
    console.log("connectiomn has been made succesfully");
  })
  .on("error", function(error) {
    console.log("connection error:", error);
  });
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger("dev"));
//app.use("/api", restRouter);

app.use((req, res, next) => {
  console.log("you clicked ");
  next();
});
app.use("/api", restRouter);
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is RUNNING AT PORT:${PORT}`);
});
