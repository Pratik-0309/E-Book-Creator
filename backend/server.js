import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import aiRoutes from "./routes/aiRoutes.js";
import exportRoutes from "./routes/exportRoutes.js"
import cookieParser from 'cookie-parser';
    
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

// app.use("/backend/uploads", express.static(path.join(__dirname,"uploads")));

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))


connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/ai",aiRoutes);
app.use("/api/export",exportRoutes);


const PORT = process.env.PORT || 8000;

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})


app.get("/",(req,res)=>{
    res.send("API is running...");
})
