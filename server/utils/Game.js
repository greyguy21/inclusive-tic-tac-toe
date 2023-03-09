const Board = require('./Board');

class Game {
    constructor(playerOne, gameID) {
        this.players = [playerOne];
        this.gameID = gameID;
        this.board = new Board(); 
    }
}

module.exports = Game;
