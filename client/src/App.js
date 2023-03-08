import "./App.css"
import WelcomePage from "./pages/WelcomePage";
import NamePage from "./pages/NamePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<WelcomePage/>}/>
      <Route path="/NamePage" element={<NamePage/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
