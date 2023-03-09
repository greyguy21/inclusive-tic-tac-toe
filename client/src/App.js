import "./App.css"
import WelcomePage from "./pages/WelcomePage";
import NamePage from "./pages/NamePage";
import ChoicePage from "./pages/ChoicePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<WelcomePage/>}/>
      <Route path="/NamePage" element={<NamePage/>}/>
      <Route path="/ChoicePage" element={<ChoicePage/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
