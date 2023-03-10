import "../App.css";
import React from "react";
import Square from "./Square";

class Board extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            board: new Array(9).fill("X"),
            piece: "X", 
            turn: "X",
            gameID: "" 
        }
    }

    render() {
        return (
            <div className="Board">
                {/*Board */}
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

export default Board