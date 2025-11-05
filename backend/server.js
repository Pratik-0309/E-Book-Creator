import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
    


dotenv.config();

const app = express();
app.use(cookieParser());

// app.use("/backend/uploads", express.static(path.join(__dirname,"uploads")));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true

}))


connectDB();
app.use(express.json());

app.use("/api/auth", authRoutes);



const PORT = process.env.PORT || 8000;

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})


app.get("/",(req,res)=>{
    res.send("API is running...");
})
