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
            socketIo.in(gameID).emit("goToGamePage"); 
        } else {
            socketIo.to(socket.id).emit("joinError");
        }
    })

    socket.on("startGame", (args) => {
        const playerName = args.playerName; 
        const gameID = args.gameID; 

        const values = gameManager.startGame(playerName, gameID);

        socketIo.to(socket.id).emit("gameStarted", values); 
    })

    socket.on("move", (args) => {
        const playerName = args.playerName; 
        const gameID = args.gameID;
        const index = args.index; 
        const piece = args.piece; 
        
        const values = gameManager.move(gameID, index, piece); 
        const status = gameManager.checkStatus(playerName, gameID, piece);

        const newBoard = values.newBoard; 

        socket.join(gameID);
        switch(status) {
            case(0):
                socketIo.to(socket.id).emit("won", {newBoard});
                socket.to(gameID).emit("opponentWon", {newBoard});
                break;
            case(1):
                socketIo.in(gameID).emit("draw", {newBoard});
                break; 
            case(2):
                socketIo.in(gameID).emit("update", values);
                break;
        }
    })

    socket.on("playAgain", (args) => {
        const gameID = args.gameID; 

        const values = gameManager.resetGame(gameID);

        socket.join(gameID); 
        socketIo.in(gameID).emit("gameReset", values);
    })

    socket.on("getResults", () => {
        const results = gameManager.getResults();
        socketIo.to(socket.id).emit("results", results);
    })

    socket.on("leave", (args) => {
        const gameID = args.gameID;
        gameManager.deleteGameInProgress(gameID); 
        socket.join(gameID);
        socketIo.in(gameID).emit("left");


    })
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    })
}); 

server.listen(4000, () => 'Server is running on port 4000');