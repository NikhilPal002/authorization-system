import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoute.js';
dotenv.config();

mongoose.connect(process.env.MONGODB).then(() =>{
  console.log('Connected to MongoDB!');
}).catch(err => {
  console.log(err);
});


const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});