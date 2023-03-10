import "../App.css";
import { useNavigate, useLocation } from "react-router-dom";
import io from "socket.io-client";

const ENDPOINT = 'http://localhost:4000/';

const LoadingPage = () => {
    const location = useLocation(); 
    const gameID = location.state.gameID; 
    console.log(gameID);

    const socket = io(ENDPOINT);
    
    socket.emit("waiting", {gameID: gameID}); 

    const navigate = useNavigate();
    socket.on("gameStart", () => {
        navigate("/GamePage", {state: {gameID: gameID}});
    });

    return (
        <div className="App">
            <div className="loading-spinner"></div>
            <h1>Waiting for Player 2</h1>
        </div>
    );
}

export default LoadingPage;