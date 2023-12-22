import React, {useState } from "react";

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
  
  const [alert,setAlert] = useState(null);
  
  
  const showalert =(type,message)=>{
    setAlert({type,message}); 

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  
  }



  return (
    <>
    <NoteState showalert={showalert}>
    <BrowserRouter>
    <Navbar showalert={showalert}/>
    <Alert alert={alert}/>
   <div className="container">
    <Routes>
    <Route  excat path="/" element={<Home></Home>}/>
    <Route excat path="/About" element ={<About></About>}/>
    <Route excat path="/login" element ={<Login showalert={showalert}></Login>}/>
    <Route excat path = "/signup" element={<Signup showalert={showalert}/>}/>
    </Routes>
    </div>
    </BrowserRouter>  
    </NoteState>
    
    </>   
  );
}

export default App;
  