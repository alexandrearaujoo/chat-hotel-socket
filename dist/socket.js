"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("./http");
const users = [];
const messages = [];
http_1.io.on("connection", (socket) => {
    socket.on("select_room", (data, callback) => {
        socket.join(data.room);
        const userInRoom = users.find(({ username, room }) => username === data.username && room === data.room);
        if (userInRoom)
            userInRoom.socketId = socket.id;
        users.push({
            room: data.room,
            username: data.username,
            socketId: socket.id,
        });
        const messagesRoom = getMessagesRoom(data.room);
        callback(messagesRoom);
    });
    socket.on("message", (data) => {
        //salvar as mensagens
        const message = {
            room: data.room,
            username: data.username,
            text: data.message,
            createdAt: new Date(),
        };
        messages.push(message);
        //enviar para os users da sala
        http_1.io.to(data.room).emit("message", message);
    });
});
const getMessagesRoom = (room) => {
    const messagesRoom = messages.filter((message) => message.room === room);
    return messagesRoom;
};
