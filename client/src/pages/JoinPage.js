import React from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

const ENDPOINT = 'http://localhost:4000/';

const JoinPage = () => {  
    const location = useLocation(); 

    return (
        <JoinPageComponent>
            {location.state}
        </JoinPageComponent>
    );
}  

class JoinPageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameID: null,
            playerName: "",
            proceed: false, 
        }
    }

    componentDidMount() {
        this.setState({playerName: this.props.children.playerName}); 
        this.socket = io(ENDPOINT);
    }

    handleOnChange = (e) => {
        this.setState({gameID: e.target.value});
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        this.socket.emit("joinGame", {
            playerName: this.state.playerName, 
            gameID: this.state.gameID
        });

        this.socket.on("gameStart", () => {
            console.log("game starts");
        }) 
    }
    
    render() {
        return (
        <div className="App">
        <h1>Enter Your Game ID</h1>
        <form onSubmit={(this.handleOnSubmit.bind(this))}>
            <input type="text" onChange={this.handleOnChange.bind(this)}></input>
            <br></br>
            <br></br>
            <label>Then, click Join</label>
            <br></br>
            <button type="submit">Join</button>
        </form>
        </div>
        ); 
    }
}

export default JoinPage; 