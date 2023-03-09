const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const GameManager = require('./utils/GameManager');

app.use(cors());

const server = http.createServer(app);
const socketIo = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

const gameManager = new GameManager();

// server -> listens to create new game -> game manager creates new game id + session manager -> so every game has a session manager 
// server -> listens to moves -> session manager will take read, write and store the moves 
// -> announce winner 
// -> after game end  
// -> ask game manager to close room & save data -> shld  i create database hmm 

// Listen for when client connects via socket.io-client
socketIo.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    // Socket event listeners 
    socket.on('hello from client', (msg) => {
        console.log(msg);
    })

    socket.on("createNewGame", (playerName) => {
        var gameID = gameManager.createNewGame(playerName);
        console.log(gameID);
        console.log(socket.id);
        socketIo.to(socket.id).emit("newGameCreated", {gameID: gameID});
    });

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    })
}); 

server.listen(4000, () => 'Server is running on port 4000');