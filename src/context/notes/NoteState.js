// Basic structure of Context Api.
import React  from "react";
import { useState } from "react";
import noteContext from "./noteContext";
const Notestate =(props)=>{

    const s1={
       "name": "Abhishek",
       "lastname":"Sankhla"  
    }
    
  const [state,setState] = useState(s1);
  const update =()=>{
    setTimeout(() => {
       setState({
        "name": "jai",
       "lastname":"hanuman"  
       }) 
    }, 2000);
  }
    return(
        <>
        <noteContext.Provider value={{state,update}}>
        {props.children}
        </noteContext.Provider>
        </>
    )
}

export default Notestate;