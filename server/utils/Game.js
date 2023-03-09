const Board = require('./Board');

class Game {
    constructor(playerOne, gameID) {
        this.players = [playerOne];
        this.gameID = gameID;
        this.board = new Board(); 
    }

    addPlayerTwo = (playerTwo) => {
        this.players.push(playerTwo);
    }
}

module.exports = Game;
