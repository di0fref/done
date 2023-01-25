import express from "express";
import http from "http";
import {Server} from "socket.io";
import cors from "cors"
import {addUser, getUser, deleteUser, getUsers} from "./users.js"

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {cors: {origin: "*"}});
const PORT = process.env.PORT || 8000
app.use(cors())

io.on('connection', (socket) => {
    socket.on('login', ({name}, callback) => {
        const {user, error} = addUser(socket.id, name)
        console.log(name + " connected")
        callback()
    })


    socket.on("leave", function ({room}){
        socket.leave(room)
        socket.emit('leave', {
            room: room,
        });
    })

    socket.on("update", function ({room, id, module}) {
        socket.broadcast.in(room).emit('update', {
            module: module,
            id: id
        });
    })

    socket.on("new", function ({room, id, module}) {
        const user = getUser(socket.id)
        console.log(user)
        socket.broadcast.in(room).emit('new', {
            module: module,
            id: id
        });
    })

    socket.on("join", function ({room, name}) {
        socket.join(room)
        console.log(name + " joined room", room)
    })

    socket.on('sendMessage', ({message, room}) => {
        const user = getUser(socket.id)
        io.in(room).emit('message', {user: user.name, text: message});
    })

    socket.on("disconnect", () => {
        // console.log("User disconnected");
        const user = deleteUser(socket.id)
        if (user) {
            console.log("Deleting user", user.name)
            io.in(user.room).emit('notification', {
                title: 'Someone just left',
                description: `${user.name} just left the room`
            })
            io.in(user.room).emit('users', getUsers(user.room))
        }
    })
})

app.get('/', (req, res) => {
    res.send("Server is up and running")
})

server.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
})
