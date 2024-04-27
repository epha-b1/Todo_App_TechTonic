const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors"); 

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); 

// Routes
app.use("/todos", todoRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/MyTodo-List", {})
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => {
    console.error(err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
