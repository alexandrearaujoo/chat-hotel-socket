import express from "express";
import http from "http";
import { Server } from "socket.io";
import { config } from "dotenv";

config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.ORIGIN } });

app.use(express.json());

export { server, io };
