import http from "http";
import express from "express"
import {WebSocketServer} from 'ws';

const app = express();

app.use(express.static('public'));
const bserver = http.createServer(app);
const webPort = 8000;

bserver.listen(webPort, function () {
    console.log('Web server start. http://localhost:' + webPort);
});
const wss = new WebSocketServer({
    server: bserver,
    verifyClient: function (info, cb) {
        // console.log(info.req.headers)
        cb(true)
    }
});


wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4();
};

wss.on('connection', (ws, req) => {
    ws.room = [];
    ws.id = wss.getUniqueID();
    ws.isAlive = true;
    ws.on('pong', heartbeat);

    ws.on('message', message => {

        let messag = JSON.parse(message);

        if (messag.leave) {
            let index = ws.room.findIndex(room => room === messag.leave)
            ws.room = ws.room.slice(index, 1)
        }

        if (messag.join) {
            if (!ws.room.includes(messag.join)) {
                ws.room.push(messag.join)
                // console.log("Joining: ", messag.join)
                // console.log("joining")
            }
        }

        if (messag.room) {
            broadcast(message, ws);
            debug(message)
        }

        if (messag.msg) {
            console.log('message: ', messag.msg)
        }

    })

    ws.on('error', e => console.log(e))
    ws.on('close', (e) => console.log('websocket closed' + e))

})
function heartbeat() {
    // console.log("Pong")
    this.isAlive = true;
}
const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false){
            console.log("Closing", ws.id)
            return ws.terminate();
        }

        ws.isAlive = false;
        console.log("Ping", ws.id)
        ws.ping();
    });
    console.log("-------------------------------------")
}, 30000);

function debug(message) {
    wss.clients.forEach(client => {
        // if (client.room.indexOf(JSON.parse(message).room) > -1) {
        //     console.log("Client", client.room)
        // }
    })
}
function broadcast(message, ws) {

    wss.clients.forEach(client => {
        if (client.room.indexOf(JSON.parse(message).room) > -1) {
            if (client !== ws) {
                console.log("-------------------------------------")
                console.log("Broadcasting to client", client.id)
                console.log("-------------------------------------")
                client.send(JSON.stringify(JSON.parse(message)))
            }
            else{
                // console.log("Not broadcasting to", client.id, client.room)
            }
        }
    })
}
