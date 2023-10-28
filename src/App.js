import React from "react";

// import all componets
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Home from "./components/Home";
import Alert from "./components/Alert";

//import react dom.
import {BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert message ={"this is amazing react course"}/>
   <div className="container">
    <Routes>
    <Route  excat path="/" element={<Home></Home>}/>
    <Route excat path="/About" element ={<About></About>}/>
    </Routes>
    </div>
    </BrowserRouter>  
    </NoteState>
    </>   
  );
}

export default App;
  