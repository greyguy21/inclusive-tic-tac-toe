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

    socket.on("results", (results) => {
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
                :  <table className="table" aria-labelledby="pastGameResults">
                    <thead className="tableHeader">
                        <tr>
                            <th className="headerItem">Outcome</th>
                            <th className="headerItem">Players Details</th>
                            <th className="headerItem">Board</th>
                            <th className="headerItem">Moves</th>
                            <th className="headerItem">Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games && games.map((g, index) => {
                        return (
                            <tr className="tableRow" key={index}>
                                {g[8] ? <td className="tableData">Draw</td> : <td className="tableData">Win</td>}
                                <td className="tableData">
                                    {g[4]}: {g[3]} 
                                    <br></br>
                                    {g[6]}: {g[5]}
                                </td>
                                <td className="tableData">{g[1]}</td>
                                <td className="tableData">{g[2]}</td>
                                <td className="tableData">{g[7]}</td>
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