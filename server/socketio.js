// attach Socket.io to our HTTP server
import express from "express";
import http from "http";
import {Server} from "socket.io";
import cors from "cors"
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {cors: {origin: "*"}});



io.on("connection", (socket) => {
    // join user's own room

    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("my message", (msg) => {
        console.log("message: " + msg);
        io.emit("my broadcast", `server: ${msg}`);
    });

    socket.on("join", (roomName) => {
        console.log("join: " + roomName);
        socket.join(roomName);
    });

    socket.on("message", ({ message, roomName }, cb) => {
        console.log("Message: " + message + " in " + roomName);
        // send socket to all in room except sender
        // socket.to(roomName).emit("message", message);
        cb({
            status: "ok"
        });
        // send to all including sender
        io.to(roomName).emit("message", message);
    });
});

server.listen(8000, () => {
    console.log('listening on *:8000');
});
