import "./App.css"
import WelcomePage from "./pages/WelcomePage";
import NamePage from "./pages/NamePage";
import SessionPage from "./pages/SessionPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<WelcomePage/>}/>
      <Route path="/NamePage" element={<NamePage/>}/>
      <Route path="/SessionPage" element={<SessionPage/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
