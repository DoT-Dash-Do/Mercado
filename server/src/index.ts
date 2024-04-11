import express from "express";
import userRouter from "./routes/userRoutes"
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

mongoose.connect(process.env.DB_URI || "enterYourDBURI")
  .then(() => console.log('MongoDB connected new'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();

app.use(express.json());

app.use('/api/user',userRouter);
app.listen(3003,()=>{
    console.log('server started');
})