
import { createServer } from "http";
import {Server} from "socket.io";

const PORT = 4000;



const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000"],
    }
});

io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });

    socket.on('message', (data) => {
        console.log(data);
        socket.emit('message', data);
    });

    socket.on('room', function (room) {
        console.log("Creating room " + room)
        socket.join(room);
    });
});

httpServer.listen(PORT);





