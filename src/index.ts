import express from "express";
import http from "http";
import cors from 'cors'
import { Server } from "socket.io";
import { config } from "dotenv";


config();

const app = express();
app.use(cors())

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

interface RoomUser {
  socketId: string;
  username: string;
  room: string;
}
interface Message {
  room: string;
  message: string;
  createdAt: Date;
  username: string;
}

const users: RoomUser[] = [];
const messages: Message[] = [];

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data, callback) => {
      socket.join(data);

      const userInRoom = users.find(
        ({ username, room }) => username === data.username && room === data.room
      );

      if (userInRoom) userInRoom.socketId = socket.id;

      users.push({
        room: data.room,
        username: data.username,
        socketId: socket.id,
      });

      const messagesRoom = getMessagesRoom(data.room);
      console.log(messagesRoom)
      callback(messagesRoom);
    });
  
    socket.on("send_message", (data) => {

      const message: Message = {
        room: data.room,
        username: data.username,
        message: data.message,
        createdAt: new Date(),
      };
  
      messages.push(message);
      console.log(messages)

      socket.to(data.room).emit("receive_message", message);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);  
    });
  });
  
  server.listen(3333, () => {
    console.log("SERVER RUNNING");
  });

  const getMessagesRoom = (room: string) => {
    const messagesRoom = messages.filter((message) => message.room === room);
  
    return messagesRoom;
  };