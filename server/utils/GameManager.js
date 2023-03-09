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
        const playerOne = new Player(playerName, gameID);
        const game = new Game(playerOne, gameID);
        this.gamesWaiting.set(gameID, game);
        return gameID;
    }

    // joinGame = (playerName, gameID) => {
    //     const canJoin = this.gamesWaiting.has(gameID);
    //     if (canJoin) {
    //         const game = this.gamesWaiting.get(gameID);
    //         const playerTwo = new Player(playerTwo, gameID); 
    //         game.addPlayerTwo(playerTwo);
    //         return true; 
    //     } else {
    //         return false; 
    //     }
    // }

}

module.exports = GameManager;