const Game = require('./Game');
const Player = require('./Player');

// {gameID, Game}, games waiting for second player to join 
class GameManager {
    gamesWaiting = new Map(); 
    gamesInProgress = new Map();
    gamesEnded = new Map();
    results = new Array();

    generateGameID = () => {
        var gameIDExists = true; 
        var gameID; 
        while (gameIDExists) {
            gameID = Math.random().toString(36).slice(-5);
            gameIDExists = this.gamesWaiting.has(gameID) || this.gamesInProgress.has(gameID);
        }
        return gameID;
    }

    createNewGame = (playerName) => {
        const gameID = this.generateGameID();
        const playerOne = new Player(playerName, gameID, "X");
        const game = new Game(playerName, playerOne, gameID);
        this.gamesWaiting.set(gameID, game);
        return gameID;
    }

    joinGame = (playerName, gameID) => {
        const canJoin = this.gamesWaiting.has(gameID);
        if (canJoin) {
            const game = this.gamesWaiting.get(gameID);
            const playerTwo = new Player(playerName, gameID, "O"); 
            game.addPlayerTwo(playerName, playerTwo);
            this.gamesInProgress.set(gameID, game);
            this.gamesWaiting.delete(gameID);
            return true; 
        } else {
            return false; 
        }
    }

    startGame = (playerName, gameID) => {
        const game = this.gamesInProgress.get(gameID);
        const player = game.players.get(playerName);
    
        const board = game.board.state; 
        const next = "X"; 
        
        const piece = player.piece; 
        const opponentName = game.playerNames.get(playerName);

        return {board, piece, next, opponentName}; 
    }

    move = (gameID, index, piece) => {
        const game = this.gamesInProgress.get(gameID);
        const values = game.board.update(index, piece);
        return values; 
    }

    checkStatus = (playerName, gameID, piece) => {
        const game = this.gamesInProgress.get(gameID);

        if (game.board.checkWin(piece)) {
            this.handleResults(playerName, piece, gameID, game, playerName, false);
            this.gamesEnded.set(gameID, game);
            this.gamesInProgress.delete(gameID);
            return 0;
        } else if (game.board.checkDraw()) {
            this.handleResults(playerName, piece, gameID, game, "", true);
            this.gamesEnded.set(gameID, game);
            this.gamesInProgress.delete(gameID);
            return 1; 
        } else {
            return 2; 
        }
    } 

    handleResults = (playerName, piece, gameID, game, winner, draw) => {
        const opponentPlayer = game.playerNames.get(playerName);
        const opponentPiece = piece == "X" ? "O" : "X"; 
        const board = game.board.state; 
        const moves = game.board.moves; 
        
        this.results.push([gameID, board, moves, playerName, piece, opponentPlayer, opponentPiece, winner, draw]);
    }

    resetGame = (gameID) => {
        const game = this.gamesEnded.get(gameID);
        game.resetGame(); 
        
        this.gamesEnded.delete(gameID);
        this.gamesInProgress.set(gameID, game);

        const newBoard = game.board.state; 
        const next = "X";
        return {newBoard, next};
    }

    getResults = () => {
        return this.results;
    }

    deleteGameInProgress = (gameID) => {
        this.gamesInProgress.delete(gameID);
    }

}

module.exports = GameManager;