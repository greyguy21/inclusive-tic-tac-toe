import React from "react";
import Board from "./Board";
import { useLocation } from "react-router-dom";

const GamePage = () => {
    const location = useLocation(); 
    const gameID = location.state.gameID;
    const playerName = location.state.playerName;

    return (
        <div>
            <Board aria-label="game board" gameID={gameID} playerName={playerName}></Board>
        </div>
    )
}

export default GamePage