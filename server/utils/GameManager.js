const Game = require('./Game');

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
        const game = new Game(playerName, gameID);
        this.gamesWaiting.set(gameID, game);
        return gameID;
    }

}

module.exports = GameManager;