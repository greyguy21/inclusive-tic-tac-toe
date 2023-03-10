import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const ENDPOINT = 'http://localhost:4000/';

const ViewPage = () => {
    const location = useLocation(); 
    const playerName = location.state.playerName; 
    const [games, setGames] = useState([]); 

    const socket = io(ENDPOINT);

    socket.emit("getResults"); 

    socket.on("resu;ts", (results) => {
        setGames(results);
    })
    console.log(games);

    const noResults = (games.length === 0);

    console.log(playerName);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1, playerName);
    }

    return (
        <div className="App">
            <button aria-label="back button" onClick={goBack}>Back</button>
            <h1 id="pastGamesResults">Past Games</h1>
            {
                noResults
                ? <h3>No history of past games available. Try Refreshing.</h3>
                :  <table aria-labelledby="pastGameResults">
                <thead>
                    <tr>
                        <th>Outcome</th>
                        <th>Players Details</th>
                        <th>Board</th>
                        <th>Moves</th>
                        <th>Winner</th>
                    </tr>
                </thead>
                <tbody>
                    {games && games.map((g, index) => {
                       return (
                        <tr key={index}>
                            {g[8] ? <td>Draw</td> : <td>Win</td>}
                            <td>{g[4]}: {g[3]} 
                                {g[6]}: {g[5]}
                            </td>
                            <td>{g[1]}</td>
                            <td>{g[2]}</td>
                            <td>{g[7]}</td>
                        </tr>
                       )
                    })}
                </tbody>
            </table>
            }
        </div>
    );
}

export default ViewPage