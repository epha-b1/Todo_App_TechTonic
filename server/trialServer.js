const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const todoRoutes = require("./routes/trialRoutes")

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/todos",todoRoutes);

mongoose
  .connect("mongodb://localhost:27017/MyTodo-List")
  .then(() => console.log("Db connection succesfully"));

app.listen(8000, () => {
  console.log("server is running ");
});


// import necessary packages 
// import routing
// connect database
// liseten server