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

    socket.on("waiting", (args) => {
        const gameID = args.gameID;
        socket.join(gameID); 
    }); 

    socket.on("createNewGame", (args) => {
        const playerName = args.playerName; 
        var gameID = gameManager.createNewGame(playerName);
        socketIo.to(socket.id).emit("newGameCreated", {gameID: gameID});
    });

    socket.on("joinGame", (args) => {
        const playerName = args.playerName; 
        const gameID = args.gameID; 

        const gameJoined = gameManager.joinGame(playerName, gameID);
        if (gameJoined) {
            socket.join(gameID);
            socketIo.in(gameID).emit("gameStart"); 
        } else {
            socketIo.to(socket.id).emit("joinError");
        }
    })

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    })
}); 

server.listen(4000, () => 'Server is running on port 4000');