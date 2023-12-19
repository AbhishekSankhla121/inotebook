import React from "react";

// import all componets
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Home from "./components/Home";
import Alert from "./components/Alert";

//import react dom.
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";

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
    <Route excat path="/login" element ={<Login></Login>}/>
    <Route excat path = "/signup" element={<Signup/>}/>
    </Routes>
    </div>
    </BrowserRouter>  
    </NoteState>
    
    </>   
  );
}

export default App;
  