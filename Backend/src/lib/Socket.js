import { Server} from 'socket.io';
import http from 'http';
import express from 'express'

const app =express();
const server = http.createServer(app);
const io = new Server(server ,{
    cors:{
        origin:"http://localhost:5173", credentials :true,
    }
})

// helper function 
export function getReceiverSocketsId(userId){
    return userSocketMap[userId];

}

 // online users store karne k liyee 
 const userSocketMap ={};  // {userId: scoketId}

io.on("connection" ,(Socket) =>{
      const id = Socket.id

   console.log(" a device is connected " ,id)

   const userId = Socket.handshake.query.userId
   if(userId) userSocketMap[userId] = Socket.id

   //io.emit() is used to send events to all the coonected clients
io.emit( "getOnlineUsers" , Object.keys(userSocketMap));

   Socket.on("disconnect" ,()=>{
       console.log(" a device is disconnected " ,id)
       delete userSocketMap[userId];
       io.emit( "getOnlineUsers" , Object.keys(userSocketMap));

   })
})
export {io, app ,server}