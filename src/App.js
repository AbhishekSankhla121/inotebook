import React from "react";

// import all componets
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Home from "./components/Home";


//import react dom.
import {BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>

    <Navbar/>
   
    <Routes>
    <Route  excat path="/" element={<Home></Home>}/>
    <Route excat path="/About" element ={<About></About>}/>
    </Routes>
    
    </BrowserRouter>  
    </NoteState>
    </>   
  );
}

export default App;
