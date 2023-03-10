const Board = require('./Board');

class Game {
    constructor(playerOneName, playerOne, gameID) {
        this.players = new Map([[playerOneName, playerOne]]);
        this.playerOneName = playerOneName;
        this.playerNames = new Map(); 
        this.gameID = gameID;
        this.board = new Board(); 
    }

    addPlayerTwo = (playerTwoName, playerTwo) => {
        this.players.set(playerTwoName, playerTwo);
        this.playerNames.set(this.playerOneName, playerTwoName); 
        this.playerNames.set(playerTwoName, this.playerOneName); 
    }
}

module.exports = Game;
