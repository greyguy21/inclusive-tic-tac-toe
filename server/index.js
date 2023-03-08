const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);
const socketIo = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

// Listen for when client connects via socket.io-client
socketIo.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    // Socket event listeners 
    socket.on('hello from client', (msg) => {
        console.log(msg);
    })

}); 

server.listen(4000, () => 'Server is running on port 4000');