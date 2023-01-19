import {store} from "../redux/store"
import {fetchUpdatedTask} from "../redux/taskSlice";
import ReconnectingWebSocket from 'reconnecting-websocket';

export const ws = new ReconnectingWebSocket("ws://localhost:8000",[],
    {
        debug: true
    }
);


ws.onopen = function () {
    console.log("Connection established")
}
ws.onerror = function (e) {
    console.error(e)
}
ws.onclose = function (e) {
    console.log('Connection closed' + e)
}

ws.onmessage = function (ms) {
    const msg = JSON.parse(ms.data)
    console.log(msg)

    switch (msg.type) {
        case "update":
            if (msg.module === "tasks") {
                store.dispatch(fetchUpdatedTask(msg.params.id))
            }
            if (msg.module === "projects") {
                // store.dispatch(fetchUpdatedTask(msg.params.id))
            }
            break;
        default:
            return
    }

}

export function ws_send(msg) {
    ws.send(JSON.stringify({msg: msg}));
}

export function ws_broadcast(msg) {
    ws.send(JSON.stringify(msg))
}

export function ws_join(room) {
    ws.send(JSON.stringify({join: room}));
}
