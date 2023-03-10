import "../App.css"
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NamePage = () => {
    const navigate = useNavigate();

    function generateDefaultUserName() { 
        const factor = 1000000; 
        var randomInt = Math.ceil(Math.random() * factor); 
        var defaultPlayerName = "Player" + randomInt.toString(); 
        return defaultPlayerName;
    }  
    var defaultPlayerName = generateDefaultUserName();

    const [playerName, setPlayerName] = useState(defaultPlayerName);

    const handleOnChange = (e) => {
        setPlayerName(e.target.value);
    }

    const handleOnSubmit = (e) => {
        navigate("/ChoicePage", {state: {playerName: playerName}});
        e.preventDefault();
    }

    return (
        <div className="App">
        <h1 id="enterName">Enter Your Name</h1>
        <label>You change the name below to something you like.</label>
        <form onSubmit={handleOnSubmit}>
            <input type="text" value={playerName} onChange={handleOnChange} aria-labelledby="enterName"></input>
            <br></br>
            <br></br>
            <label>Then, click Next to continue</label>
            <br></br>
            <button type="submit" aria-label="next button">Next</button>
        </form>
        </div>
    );  
}

export default NamePage;