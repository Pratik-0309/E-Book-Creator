import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


connectDB();
app.use(express.json());

// app.use("/backend/uploads", express.static(path.join(__dirname,"uploads")));

const PORT = process.env.PORT || 8000;

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})


app.get("/",(req,res)=>{
    res.send("API is running...");
})
