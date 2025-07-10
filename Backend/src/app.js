import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { app, server, io } from './lib/Socket.js';

const corsOptions = {
  origin: "https://annova-chat-app.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Handle CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // <-- 💥 This handles preflight requests properly

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
import authRoutes from './routes/auth.route.js';
import messagesRoute from './routes/messages.route.js';

app.use('/api/auth', authRoutes);
app.use('/api/messages', messagesRoute);

export default server;
