// import { useLocation } from "react-router-dom";
import io from "socket.io-client";

const ENDPOINT = 'http://localhost:4000/';

const ViewPage = () => {
    // const location = useLocation(); 
    // const playerName = location.state.playerName; 

    const socket = io(ENDPOINT);

    socket.emit("getResults"); 
    
    let games; 
    socket.on("results", ({results}) => {
        console.log(results); 
    })
    console.log(games);

    const createViewTile = (game) => {
        if (game.draw) {
            return (
                <div>
                    <h2>Draw</h2>
                    <label>{game.playerPiece}: {game.playerName}</label>
                    <label>{game.opponentPiece}: {game.opponentName}</label>
                    <label>Final Board: {game.board}</label>
                    <label>Moves: {game.moves}</label>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Winner: {game.winner}</h2>
                    <label>{game.playerPiece}: {game.playerName}</label>
                    <label>{game.opponentPiece}: {game.opponentName}</label>
                    <label>Final Board: {game.board}</label>
                    <label>Moves: {game.moves}</label>
                </div>
            )
        }
    }
    
    let viewTileArray = [];
    for (let i = 0; i < this.games; i++) {
        const game = games.get(i);
        const newViewTile = createViewTile(game);
        viewTileArray.push(newViewTile);
    }

    return (
        <div>
            <h1>Past Games</h1>
            <div>{viewTileArray}</div>
        </div>
    );
}

export default ViewPage