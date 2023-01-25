import {Manager} from "socket.io-client";
import {store} from "../redux/store";
import {fetchNewTask, fetchUpdatedTask, getTasks} from "../redux/taskSlice";
import io from "socket.io-client"
import {getProjects} from "../redux/projectSlice";

const ENDPOINT = 'ws://localhost:8000';
// const manager = new Manager(ENDPOINT);
// export const socket = manager.socket("/", {
//     reconnection: true,
//     reconnectionDelay: 1000,
//     reconnectionDelayMax: 5000,
//     reconnectionAttempts: 99999
// });
export const socket = io.connect(ENDPOINT, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 99999
});

export function emit(type, id, room, module) {
    let params = {type, id, room, module}
    socket.emit(type, params)
}

export function join(room) {
    socket.emit("join", {
        name: store.getState().current.user.name,
        room: room
    })
}

export function leave(room) {
    socket.emit("leave", {room: room})
}

export function waitForRedux(cb, timer) {
    if (!store.getState().projects || !store.getState().current.user.id) {
        return timer = setTimeout(waitForRedux.bind(null, cb), 100)
    }
    clearTimeout(timer)
    if (typeof cb !== 'function') {
        return true
    }
    // console.log("redux done")
    return cb()
}

socket.on("connect_error", () => {
    console.log("connect_error")
    setTimeout(() => {
        socket.connect();
    }, 1000);
});


socket.on('connect', () => {

    waitForRedux(() => {
        console.log('Successfully connected!');
        console.log("Logging in")
        socket.emit('login', {name: store.getState().current.user.name}, response => {
            // console.error(response)
        })
        store.getState().projects.map(project => {
            console.log("Joining: ", project.id)
            join(project.id)
        })
    })
})

socket.on("leave", function (msg) {
    /* Lets re-fetch all */
    store.dispatch(getProjects())
    store.dispatch(getTasks())
    console.log(msg)
})

socket.on("update", function (msg) {
    console.log(msg)
    if (msg.module === "tasks") {
        store.dispatch(fetchUpdatedTask(msg.id))
    }
})

socket.on("new", function (msg) {
    console.log(msg)
    if (msg.module === "tasks") {
        store.dispatch(fetchNewTask(msg.id))
    }
})
