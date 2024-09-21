const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const main = async () => {
  try {
    const connection = await mongoose.connect(
      `mongodb+srv://devbhattacharya42:devBhattacharya42@cluster0.qspr9.mongodb.net/`
    );
    console.log("Connected to MongoDB Database");
  } catch (e) {
    console.log(e);
    console.log("Error while connecting to mongoDB database");
  }
};
main();

app.use(
  cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
