import { useState } from "react";
import io from "socket.io-client";

const ENDPOINT = 'http://localhost:4000/';

const ViewPage = () => {
    // const location = useLocation(); 
    // const playerName = location.state.playerName; 
    const [games, setGames] = useState([]); 

    const socket = io(ENDPOINT);

    socket.emit("getResults"); 

    socket.on("resu;ts", (results) => {
        setGames(results);
    })
    console.log(games);

    return (
        <div>
            <h1>Past Games</h1>
            <table>
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
        </div>
    );
}

export default ViewPage