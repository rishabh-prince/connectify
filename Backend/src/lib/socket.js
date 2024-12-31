import {Server} from "socket.io";
import http from "http";
import express from "express";

const app=express();
const server =http.createServer(app);

const URI =
  process.env.NODE_ENV === "production"
    ? "https://connectify111.onrender.com"
    : "http://localhost:5173";
const io = new Server(server,{
    cors :{
        origin: [URI]
    }
})

export const getReceiverSocketId=(userId)=>{
     return userSocketMap[userId];
}

const userSocketMap ={};

io.on("connection",(socket)=>{
    console.log("A user connected",socket.id);

    const userId=socket.handshake.query.userId;
    if(userId) userSocketMap[userId]=socket.id;

    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("A user disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})

export {io,app,server};
