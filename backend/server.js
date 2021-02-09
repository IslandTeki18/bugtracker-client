import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
// Imported routes

dotenv.config()
const app = express()
app.use(express.json())
connectDB()

// app.use routes

const PORT = process.env.PORT || 5000;
app.listen(
   PORT,
   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)