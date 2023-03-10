import React from "react";
import Board from "./Board";
import { useLocation } from "react-router-dom";

const GamePage = () => {
    const location = useLocation(); 
    const gameID = location.state.gameID;
    const playerName = location.state.playerName;

    return (
        <div className="App">
            <Board gameID={gameID} playerName={playerName}></Board>
            {/* Leave Game*/}
            {/* Play Again */}
        </div>
    )
}

export default GamePage