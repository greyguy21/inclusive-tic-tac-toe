import "../App.css";
import React from "react";
import io from "socket.io-client";
import { Navigate } from "react-router-dom";

const ENDPOINT = 'http://localhost:4000/';

class Board extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            board: null,
            piece: "", 
            turn: false,
            playerName: "",
            opponentName: "",
            message: "",
            gameID: "", 
            initialized: false, 
            end: false, 
            leave: false,
            theme: null, 
        }
    }

    componentDidMount() {
        this.socket = io(ENDPOINT);
        const theme = localStorage.getItem('theme');
        this.setState({theme: theme});

        if (!this.state.initialized) {
            const playerName = this.props.playerName; 
            const gameID = this.props.gameID; 

            this.setState({playerName: playerName}); 
            this.setState({gameID: gameID});

            // emit event to server that player has joined game room 
            this.socket.emit("startGame", {playerName, gameID}); 
            this.socket.on("gameStarted", ({board, piece, next, opponentName}) => {
                this.initializeGame(board, piece, next, opponentName);
            })
        }

        this.socket.on("update", ({newBoard, next}) => {
            this.handleUpdate(newBoard, next);
        });

        this.socket.on("won", ({newBoard}) => {
            this.handleWin(newBoard);
        })

        this.socket.on("opponentWon", ({newBoard}) => {
            this.handleOpponentWin(newBoard);
        })

        this.socket.on("draw", ({newBoard}) => {
            this.handleDraw(newBoard); 
        })

        this.socket.on("gameReset", ({newBoard, next}) => {
            this.handleReset(newBoard, next); 
        })

        this.socket.on("left", () => {
            this.setState({leave: true});
        })
    }

    componentDidUpdate() {
        if (!this.state.turn) {
            this.socket.emit("waiting", {gameID: this.state.gameID});
        }
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    initializeGame = (board, piece, next, opponentName) => {
        this.setState({opponentName: opponentName});
        this.setState({piece: piece}, () => {this.startGame(board, next)}); 
    }

    startGame = (board, next) => {
        this.setBoard(board);
        this.setTurn(next);
        this.setState({initialized: true});
    }

    setBoard = (board) => {
        this.setState({board: board});
    }

    setTurn = (next) => {
        if (next === this.state.piece) {
            this.setState({turn: true}, ()=> {this.setTurnMessage()}); 
        } else {
            this.setState({turn: false}, () => {this.setTurnMessage()});
        }
    }

    setTurnMessage = () => {
        const msg = this.state.turn ? "Your Turn" : this.state.opponentName + "'s Turn"; 
        this.setState({message: msg}); 
    }

    handleUpdate = (newBoard, next) => {
        this.setBoard(newBoard); 
        this.setTurn(next);
    }

    handleWin = (newBoard) => {
        this.setBoard(newBoard);
        this.setState({message: "You Won"}); 
        this.setState({end: true});
    }

    handleOpponentWin = (newBoard) => {
        this.setBoard(newBoard);
        const msg = this.state.opponentName + " Won";  
        this.setState({message: msg});
        this.setState({end: true});
    }

    handleDraw = (newBoard) => {
        this.setBoard(newBoard); 
        this.setState({message: "It's A Draw"});
        this.setState({end: true});
    }

    handlePlayAgain = () => {
        const gameID = this.state.gameID;
        this.socket.emit("playAgain", {gameID});
    }

    handleReset = (newBoard, next) => {
        this.setBoard(newBoard);
        this.setTurn(next);
        this.setState({end: false});
    }

    handleLeave = () => {
        const gameID = this.state.gameID; 
        this.socket.emit("leave", {gameID});
    }

    handleClickSquare  = (index) => {
        const board = this.state.board; 
        const turn = this.state.turn; 
        const gameID = this.state.gameID; 
        const playerName = this.state.playerName; 
        const piece = this.state.piece; 

        const squareIsEmpty = (board[index] === "");

        if (squareIsEmpty && turn) {
            this.socket.emit("move", {playerName, gameID, index, piece});
        }
    }

    render() {
        if (!this.state.initialized) {
            return (
            <div className="App">
                <h1>Setting up...</h1>
            </div>
            )
        } else if (this.state.leave) {
            return (
                <Navigate to="/ChoicePage" state={{playerName: this.state.playerName}}></Navigate>
            );
        } else {
            return (
                <div className="Board">
                    {/*Board */}
                    <h1>{this.state.message}</h1>
                    {!this.state.end ? <h3>Your Piece is {this.state.piece}</h3> : null}
                    <div className="Row">{/*Row */}
                        <button aria-label={`row 1 column 1 ${this.state.board[0]}`} className="Square" onClick={this.handleClickSquare.bind(this, 0)}>{this.state.board[0]}</button>
                        <button aria-label={`row 1 column 2 ${this.state.board[1]}`} className="Square" onClick={this.handleClickSquare.bind(this, 1)}>{this.state.board[1]}</button>
                        <button aria-label={`row 1 column 3 ${this.state.board[2]}`} className="Square" onClick={this.handleClickSquare.bind(this, 2)}>{this.state.board[2]}</button>
                    </div>
                    <div className="Row">{/*Row */}
                        <button aria-label={`row 2 column 1 ${this.state.board[3]}`} className="Square" onClick={this.handleClickSquare.bind(this, 3)}>{this.state.board[3]}</button>
                        <button aria-label={`row 2 column 2 ${this.state.board[4]}`} className="Square" onClick={this.handleClickSquare.bind(this, 4)}>{this.state.board[4]}</button>
                        <button aria-label={`row 2 column 3 ${this.state.board[5]}`} className="Square" onClick={this.handleClickSquare.bind(this, 5)}>{this.state.board[5]}</button>
                    </div>
                    <div className="Row">{/*Row */}
                        <button aria-label={`row 3 column 1 ${this.state.board[6]}`} className="Square" onClick={this.handleClickSquare.bind(this, 6)}>{this.state.board[6]}</button>
                        <button aria-label={`row 3 column 2 ${this.state.board[7]}`} className="Square" onClick={this.handleClickSquare.bind(this, 7)}>{this.state.board[7]}</button>
                        <button aria-label={`row 3 column 3 ${this.state.board[8]}`} className="Square" onClick={this.handleClickSquare.bind(this, 8)}>{this.state.board[8]}</button>
                    </div>        
                    {this.state.end ? <div className="game"><button className="button50" aria-label="play again button" type="submit" onClick={this.handlePlayAgain.bind(this)}>Play Again</button><button className="button50" aria-label="leave game" type="submit" onClick={this.handleLeave.bind(this)}>Leave Game</button></div> : null}      
                </div>
            )
        }
    }
}

export default Board