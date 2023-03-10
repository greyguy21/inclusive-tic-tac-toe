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
    
    componentWillUnmount() {
        this.socket.disconnect(); 
    }

    handleCreateGame() {
        this.socket.emit("createNewGame", {playerName: this.state.playerName});
        this.socket.on("newGameCreated", (
            (gameID) => {
                this.setState({
                    gameID: gameID.gameID, 
                    choice: 1
                })
            }
        ));
    }

    handleJoinGame() {
        this.setState({choice: 2})
    }
    
    handleView() {
        this.setState({choice: 3})
    }

    render() {
        switch(this.state.choice){
            case(1): 
                return (
                    <Navigate to="/LoadingPage" state={{gameID: this.state.gameID, playerName: this.state.playerName}}></Navigate>
                )
            case(2): 
                return (
                    <Navigate to="/JoinPage" state={{playerName: this.state.playerName}}></Navigate>
                )
            case(3):
                return (
                    <Navigate to="/ViewPage" state={{playerName: this.state.playerName}}></Navigate>
                )
            case(0):
                return (
                    <div className="App">
                        <h1>hi {this.state.playerName}</h1>
                        <label className="text">Would you like to</label>
                        <br></br>
                       <div>
                            <button className="button" type="submit" onClick={this.handleCreateGame.bind(this)} aria-label="create a new game button">Create A New Game</button>
                            <br></br>
                            <br></br>
                            <button className="button" type="submit" onClick={this.handleJoinGame.bind(this)} aria-label="join a game button">Join A Game</button>
                            <br></br>
                            <br></br>
                            <button className="button" type="submit" onClick={this.handleView.bind(this)} aria-label="view past games button">View Past Games</button>
                       </div>
                    </div>
                )  
            default:
                return null;
        }
    }
}

export default ChoicePage;