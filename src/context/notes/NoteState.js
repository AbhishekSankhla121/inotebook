// Basic structure of Context Api.
import React  from "react";

import noteContext from "./noteContext";


const Notestate =(props)=>{

    return(
        <>
        <noteContext.Provider value={{}}>
        {props.children}
        </noteContext.Provider>
        </>
    )
}

export default Notestate;