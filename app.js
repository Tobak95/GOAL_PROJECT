require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const goalRouter = require("./routes/goalRouter");

//middleware are functions that run on the server btw the req and res
app.use(express.json());
app.use(cors());
//its allow our server to have a req body

//HOME ROUTE
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to GOAL api",
  });
});
app.use("/goals", goalRouter);

//Error Route: Thr error route will nalways be at the end of te app.get route so its wont run before other existing route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource Not Found",
  });
});

const connectToDb = async () => {
  try {
    //Db connection logic
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "goals",
    });

    app.listen(PORT, () => {
      console.log(`server running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connectToDb();
