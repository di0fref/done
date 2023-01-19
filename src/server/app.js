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
const wss = new WebSocketServer({server: bserver});

wss.on('connection', ws => {
    ws.room = [];
    ws.send(JSON.stringify({msg: "user joined"}));
    console.log('connected');
    ws.on('message', message => {

        let messag = JSON.parse(message);
        if (messag.join) {

            if (!ws.room.includes(messag.join)) {
                ws.room.push(messag.join)
                console.log("Joining: ", messag.join)
            }
            else{
                // console.log("Room already exist:", messag.join)
            }
        }
        if (messag.room) {
            broadcast(message);
        }
        if (messag.msg) {
            console.log('message: ', messag.msg)
        }
    })

    ws.on('error', e => console.log(e))
    ws.on('close', (e) => console.log('websocket closed' + e))

})

function broadcast(message) {
    wss.clients.forEach(client => {
        if (client.room.indexOf(JSON.parse(message).room) > -1) {
            console.log("Broadcasting to", JSON.parse(message).room)
            client.send(JSON.stringify(JSON.parse(message)))
        }
    })
}
