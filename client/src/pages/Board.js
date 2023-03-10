import "../App.css";
import React from "react";
import Square from "./Square";
import io from "socket.io-client";

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
            turnMessage: "",
            gameID: "", 
            initialized: false, 
        }
    }

    componentDidMount() {
        this.socket = io(ENDPOINT);

        if (!this.state.initialized) {
            console.log(this.props);
            const playerName = this.props.playerName; 
            const gameID = this.props.gameID; 
            console.log(playerName); 
            console.log(gameID);

            this.setState({playerName: playerName}); 
            this.setState({gameID: gameID});

            // emit event to server that player has joined game room 
            this.socket.emit("startGame", {playerName, gameID}); 
            this.socket.on("gameStarted", ({board, piece, next, opponentName}) => {
                console.log("initializing");
                this.initializeGame(board, piece, next, opponentName);
            })
        }

        this.socket.on("update", ({newBoard, next}) => {
            console.log("updated");
            this.handleUpdate(newBoard, next);
        });
    }

    componentDidUpdate() {
        if (!this.state.turn) {
            console.log("waiting");
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
        console.log(this.state.piece);
        this.setBoard(board);
        this.setTurn(next);
        this.setState({initialized: true});
    }

    setBoard = (board) => {
        this.setState({board: board});
    }

    setTurn = (next) => {
        console.log(next);
        console.log(this.state.piece);
        if (next === this.state.piece) {
            this.setState({turn: true}, ()=> {this.setTurnMessage()}); 
        } else {
            this.setState({turn: false}, () => {this.setTurnMessage()});
        }
    }

    setTurnMessage = () => {
        const msg = this.state.turn ? "Your Turn" : this.state.opponentName + "'s Turn"; 
        console.log(msg);
        this.setState({turnMessage: msg}); 
    }

    handleUpdate = (newBoard, next) => {
        console.log(newBoard);
        this.setBoard(newBoard); 
        console.log(next);
        this.setTurn(next);
    }

    handleClickSquare  = (index) => {
        console.log(this.state.board);
        console.log(index);
        const board = this.state.board; 
        const turn = this.state.turn; 
        const gameID = this.state.gameID; 
        const playerName = this.state.gameID; 
        const piece = this.state.piece; 

        const squareIsEmpty = (board[index] === "");
        console.log(board[index]);

        console.log("clicked");
        if (squareIsEmpty && turn) {
            console.log("move");
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
        } else {
            return (
                <div className="Board">
                    {/*Board */}
                    <h1>{this.state.turnMessage}</h1>
                    <h3>Your Piece is {this.state.piece}</h3>
                    <div className="Row">{/*Row */}
                        <Square index={0} value={this.state.board[0]} onClick={this.handleClickSquare.bind(this)}/>
                        <Square index={1} value={this.state.board[1]} onClick={this.handleClickSquare.bind(this)}/>
                        <Square index={2} value={this.state.board[2]} onClick={this.handleClickSquare.bind(this)}/>
                    </div>
                    <div className="Row">{/*Row */}
                        <Square index={3} value={this.state.board[3]} onClick={this.handleClickSquare.bind(this)}/>
                        <Square index={4} value={this.state.board[4]} onClick={this.handleClickSquare.bind(this)}/>
                        <Square index={5} value={this.state.board[5]} onClick={this.handleClickSquare.bind(this)}/>               
                    </div>
                    <div className="Row">{/*Row */}
                        <Square index={6} value={this.state.board[6]} onClick={this.handleClickSquare.bind(this)}/>
                        <Square index={7} value={this.state.board[7]} onClick={this.handleClickSquare.bind(this)}/>
                        <Square index={8} value={this.state.board[8]} onClick={this.handleClickSquare.bind(this)}/>
                    </div>                
                </div>
            )
        }
    }
}

export default Board