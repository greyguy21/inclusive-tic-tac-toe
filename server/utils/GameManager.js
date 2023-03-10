const Game = require('./Game');
const Player = require('./Player');

// {gameID, Game}, games waiting for second player to join 
class GameManager {
    gamesWaiting = new Map(); 
    gamesInProgress = new Map();

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
        console.log(game);
        console.log(game.players);
        const player = game.players.get(playerName);
    
        const board = game.board.state; 
        const next = "X"; 
        
        const piece = player.piece; 
        const opponentName = game.playerNames.get(playerName);
        console.log(opponentName);

        return {board, piece, next, opponentName}; 
    }

    move = (playerName, gameID, index, piece) => {
        const game = this.gamesInProgress.get(gameID);
        const player = game.players.get(playerName);

        const values = game.board.update(index, piece);
        console.log(values);
        return values; 
    }

}

module.exports = GameManager;