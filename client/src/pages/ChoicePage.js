import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import io from "socket.io-client";

const ENDPOINT = 'http://localhost:4000/';

const ChoicePage = () => {
    const location = useLocation();
    return (
        <ChoicePageComponent>
            {location.state}
        </ChoicePageComponent>
    ); 
}

class ChoicePageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: "",
            gameID: null, 
            choice: 0, 
        }
    }

    componentDidMount() {
        // Get Player Name
        var name = this.props.children.playerName; 
        this.setState({playerName : name});

        this.socket = io(ENDPOINT);
    }
    
    handleCreateGame() {
        this.socket.emit("createNewGame", {playerName: this.state.playerName});
        this.socket.on("newGameCreated", (
            (gameID) => {
                console.log("???");
                this.setState({
                    gameID: gameID.gameID, 
                    choice: 1
                })
            }
        ));
    }

    handleJoinGame() {
        this.setState({choice : 2})
    }
    
    render() {
        switch(this.state.choice){
            case(1): 
                // New game created -> go to loading page 
                return (
                    <Navigate to="/LoadingPage" state={{socket: this.socket, playerName: this.state.playerName, gameID: this.state.gameID}}></Navigate>
                )
            case(2): 
                // join game
                return (
                    <div>
                        <h1>joinGame: {this.state.playerName}</h1>
                    </div>
                )
            case(0):
                // Would you like to 
                return (
                    <div className="App">
                        <h1>hi {this.state.playerName}</h1>
                        <label>would you like to</label>
                        <br></br>
                       <div>
                            <button type="submit" onClick={this.handleCreateGame.bind(this)}>Create A New Game</button>
                            <br></br>
                            <button type="submit">Join A Game</button>
                       </div>
                    </div>
                )  
            default:
                return null;
        }
    }
}

export default ChoicePage;