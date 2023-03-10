import "../App.css";
import { useNavigate, useLocation } from "react-router-dom";
import io from "socket.io-client";

const ENDPOINT = 'http://localhost:4000/';

const LoadingPage = () => {
    const location = useLocation(); 
    const gameID = location.state.gameID; 
    const playerName = location.state.playerName;
    console.log(gameID);
    console.log(playerName);

    const socket = io(ENDPOINT);
    
    socket.emit("waiting", {gameID: gameID}); 

    const navigate = useNavigate();
    socket.on("goToGamePage", () => {
        navigate("/GamePage", {state: {gameID: gameID, playerName: playerName}});
    });

    return (
        <div className="App">
            <h1>Waiting for Player 2</h1>
            <div className="loading-spinner"></div>
            <h1>{gameID}</h1>
            <label>Copy the code and send to a friend</label>
        </div>
    );
}

export default LoadingPage;