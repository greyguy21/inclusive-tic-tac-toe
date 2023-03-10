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

        console.log("hi");
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
            this.socket.on("gameStarted", ({board, piece, turn, opponentName}) => {
                console.log("initializing");
                this.initializeGame(board, piece, turn, opponentName);
            })
        }

    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    initializeGame = (board, piece, turn, opponentName) => {
        this.setState({opponentName: opponentName});
        this.setState({piece: piece}, () => {this.startGame(board, turn)}); 
    }

    startGame = (board, turn) => {
        console.log(this.state.piece);
        this.setBoard(board);
        this.setTurn(turn);
        this.setState({initialized: true});
    }

    setBoard = (board) => {
        this.setState({board: board});
    }

    setTurn = (turn) => {
        console.log(this.state.piece);
        if (turn === this.state.piece) {
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
                        <Square val={this.state.board[0]}/>
                        <Square val={this.state.board[1]}/>
                        <Square val={this.state.board[2]}/>
                    </div>
                    <div className="Row">{/*Row */}
                        <Square val={this.state.board[3]}/>
                        <Square val={this.state.board[4]}/>
                        <Square val={this.state.board[5]}/>               
                    </div>
                    <div className="Row">{/*Row */}
                        <Square val={this.state.board[6]}/>
                        <Square val={this.state.board[7]}/>
                        <Square val={this.state.board[8]}/>
                    </div>                
                </div>
            )
        }
    }
}

export default Board