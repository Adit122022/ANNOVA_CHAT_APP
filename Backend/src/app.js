import express from "express";
import cors from "cors";
import { app, server, io } from "./lib/Socket.js";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import morgan from "morgan";

app.set("trust proxy", 1);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json());
app.use(cors({ origin: config.CLIENT_URL, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import authRoutes from "./routes/auth.route.js";
import messagesRoute from "./routes/messages.route.js";

//  Health route
app.get("/api/health",(req,res)=>{
    res.json({message :"Server Health is fine"})
})

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoute);

export default server;
