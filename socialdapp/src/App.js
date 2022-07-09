

import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Explore from "./components/explore";
import Create from "./components/create";

function App() {

  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<Home/>}></Route>
    <Route exact path ="/create" element ={<Create/>} />  
    <Route exact path ="/explore" element ={<Explore/>} />  
 </Routes>
  </Router>
  );
}

export default App;
