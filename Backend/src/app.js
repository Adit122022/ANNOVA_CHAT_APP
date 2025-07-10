import express from 'express';
import cors from 'cors'
import {app ,server ,io} from './lib/Socket.js'
import cookieParser from 'cookie-parser';
//  middelwares bhar vale
app.use(express.json())
app.use(cors({ origin: "https://annova-chat-app.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

import authRoutes from './routes/auth.route.js'
import messagesRoute from './routes/messages.route.js'


app.use('/api/auth' , authRoutes)
app.use('/api/messages' , messagesRoute)



export default server;
