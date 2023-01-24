import {store} from "../redux/store"
import {fetchNewTask, fetchUpdatedTask, getTasks} from "../redux/taskSlice";
import ReconnectingWebSocket from 'reconnecting-websocket';
import {getProjects} from "../redux/projectSlice";

const user_id = store.getState().current.user.id



export const ws = new ReconnectingWebSocket("ws://localhost:8000", [],
    {
        debug: false
    }
);


ws.onopen = function (response) {
    console.log("Connection established", response)
    waitForRedux(function () {
        store.getState().projects.map(project => ws_join(project.id))
    })
}
ws.onerror = function (e) {
    console.error(e)
}
ws.onclose = function (e) {
    console.log('Connection closed' + e)
}
ws.onclose = function clear() {
    clearTimeout(this.pingTimeout);
}

export function waitForRedux(cb, timer) {
    // console.log("Waiting on redux")
    if (!store.getState().projects) {
        // console.log("Redux not done")
        return timer = setTimeout(waitForRedux.bind(null, cb), 100)
    }
    clearTimeout(timer)
    if (typeof cb !== 'function') {
        return true
    }
    // console.log("redux done")
    return cb()
}

ws.onmessage = function (ms) {
    const msg = JSON.parse(ms.data)
    // console.log(msg)
    switch (msg.type) {
        case "update":
            if (msg.module === "tasks") {
                store.dispatch(fetchUpdatedTask(msg.params.id))
            }
            if (msg.module === "projects") {
                // store.dispatch(fetchUpdatedTask(msg.params.id))
            }
            break;
        case "leave":
            console.log("leave")
            store.dispatch(getProjects())
            store.dispatch(getTasks())
            break;
        case "new":
            store.dispatch(fetchNewTask(msg.params.id))
            break
        default:
            return
    }

}

export function ws_leave(msg) {
    if(!msg.room){
        console.error("Missing room in ws_leave", msg)
        return false
    }
    ws.send(JSON.stringify({
        room: msg.room,
        leave: msg.room,
        type: "leave",
    }));
}

export function ws_send(msg) {
    ws.send(JSON.stringify({msg: msg}));
}

export function ws_broadcast(msg) {
    if(!msg.room){
        console.error("Missing room in ws_broadcast", msg)
        return false
    }
    msg.user_id = user_id;
    ws.send(JSON.stringify(msg))
}

export function ws_join(room) {
    if(!room){
        console.error("Missing room in ws_join")
        return false
    }
    console.log("Joining", room)
    ws.send(JSON.stringify({join: room}));
}
