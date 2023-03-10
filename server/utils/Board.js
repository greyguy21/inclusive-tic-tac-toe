class Board {
    constructor() {
        this.state = Array(9).fill("");
        this.moves = []; 
        this.playerOneMoves = []; 
        this.playerTwoMoves = [];
        this.next = new Map([["X", "O"], ["O", "X"]]);

        this.winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4 ,7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ]
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

    checkWin = (piece) => {
        if (piece == "X") {
            return this.winConditions.some( w => (w.every((e => this.playerOneMoves.includes(e)))));
        } else {
            return this.winConditions.some( w => (w.every(e => this.playerTwoMoves.includes(e))));
        }
    } 

    checkDraw = () => {;
       return this.moves.length === 9;
    } 
}

module.exports = Board