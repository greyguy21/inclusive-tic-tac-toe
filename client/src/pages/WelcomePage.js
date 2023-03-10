import "../App.css"
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  function handleClick(e) {
    navigate("/NamePage");
  }

  return ( 
    <div className="App">
      <h1>Welcome to Tic Tac Toe</h1>
      <button className="button50" onClick={handleClick} aria-label="start button">Start</button>
    </div>
  )
}

export default WelcomePage;