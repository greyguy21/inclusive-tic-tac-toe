import "../App.css";
// import { useLocation, useNavigate } from "react-router-dom";

const LoadingPage = () => {
    // const location = useLocation(); 
    // const socket = this.location.socket;
    
    // socket.on("gameStart", () => {
    //     useNavigate("/GamePage"); 
    // });

    return (
        <div className="App">
            <LoadingSpinner></LoadingSpinner>
            <h1>Waiting for Player 2</h1>
        </div>
    );
}

const LoadingSpinner = () => {
    return (
        <div>
            <div className="loading-spinner"></div>
        </div>
    );
}
export default LoadingPage;