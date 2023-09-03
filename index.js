require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");
const app = express();

//Middleware and Configuration
app.use(express.json());


//MongoDB connection string
mongoose
  .connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error Connecting to MongoDB: ", err));

//Use routes
app.use("/api", apiRoutes);
app.use('/auth', authRoutes);

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
