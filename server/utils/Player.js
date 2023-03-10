class Player {
    constructor(playerName, gameID, piece) {
        this.playerName = playerName; 
        this.gameID = gameID; 
        this.piece = piece;
        this.moves = [];
    }
}

module.exports = Player