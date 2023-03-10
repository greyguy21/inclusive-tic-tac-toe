import "./App.css"
import WelcomePage from "./pages/WelcomePage";
import NamePage from "./pages/NamePage";
import ChoicePage from "./pages/ChoicePage";
import LoadingPage from "./pages/LoadingPage";
import JoinPage from "./pages/JoinPage";
import ViewPage from "./pages/ViewPage";
import GamePage from "./pages/GamePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<WelcomePage/>}/>
      <Route path="/NamePage" element={<NamePage/>}/>
      <Route path="/ChoicePage" element={<ChoicePage/>}/>
      <Route path="/LoadingPage" element={<LoadingPage/>}/>
      <Route path="/JoinPage" element={<JoinPage/>}/>
      <Route path="/ViewPage" element={<ViewPage/>}/>
      <Route path="/GamePage" element={<GamePage/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
