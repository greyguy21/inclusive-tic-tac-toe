class Board {
    constructor() {
        this.state = Array(9).fill("");
        this.moves = []; 
        this.playerOneMoves = []; 
        this.playerTwoMoves = [];
        this.next = new Map([["X", "O"], ["O", "X"]]);
    }

    update = (index, piece) => {
        console.log("updating");
        this.state[index] = piece; 
        this.moves.push(index); 
    
        if (piece == "X") {
            this.playerOneMoves.push(index);
        } else {
            this.playerTwoMoves.push(index);
        }

        const next = this.next.get(piece);

        const newBoard = this.state;
        return {newBoard, next};  
    }
}

module.exports = Board