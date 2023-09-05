const express = require('express');
const app = express();
const http = require('https');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const messages = []


io.on('connection', (socket) => {
    const username = socket.handshake.query.username
    console.log("ser name is ", username);
    socket.on('message', (data) => {
        console.log(username);
        const message = {
            message: data.message,
            senderUsername: username,
            sentAt: Date.now()
        }
        messages.push(message)
        io.emit('message', message)

    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});