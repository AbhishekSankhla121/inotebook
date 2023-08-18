import React,{useContext, useEffect}from 'react';
import noteContext from '../context/notes/noteContext';
export default function About(){
    const a = useContext(noteContext);
    useEffect(() => {
        a.update();
    },[])
    
    return(
        <>
        <h1>my first name is {a.state.name} & last name is {a.state.lastname}</h1>
        </>
    )
}