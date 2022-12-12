import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import lists from "./lists.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/lists", lists);

const uri = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5000;

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(uri, { useUnifiedTopology: true });
    console.log(`MongoDB connnected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDatabase().then(() => {
  app.listen(PORT, () => console.log("server running on port 5000"));
});
