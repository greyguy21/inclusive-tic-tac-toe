import React from "react";
import { useLocation } from "react-router-dom";

const SessionPage = () => {
    const location = useLocation();
    return (
        <SessionPageComponent>
            {location.state}
        </SessionPageComponent>
    ); 
}

class SessionPageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1, 
            playerName: "",
        }
    }

    componentDidMount() {
        var name = this.props.children.playerName; 
        this.setState({playerName : name});
    }

    render() {
        return (
            <div className="App">
                <h1>hi {this.state.playerName}</h1>
                <label>would you like to</label>
                <br></br>
               <div>
                    <button type="submit">Create A New Game</button>
                    <br></br>
                    <button type="submit">Join A New Game</button>
               </div>
            </div>
        )
    }
}

export default SessionPage;