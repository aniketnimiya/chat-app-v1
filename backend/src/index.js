import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";



import {app , server , io} from "./lib/socket.js";

app.use(express.json());
app.use(cookieparser());
app.use(
    cors({
        origin: ["http://localhost:5173" , "http://localhost:5174"],
        credentials:true,
    })
);



// -->> ROUTES
import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);
import messageRoutes from "./routes/message.routes.js";
app.use("/api/messages", messageRoutes);



import { connectDB } from "./lib/db.js";
const PORT=process.env.PORT || 5000;
server.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING AT PORT : ${PORT}`);
    connectDB();
});