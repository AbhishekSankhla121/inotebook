// Basic structure of Context Api.
import React, { useState }  from "react";

import noteContext from "./noteContext";


const Notestate =(props)=>{
    const host ="http://localhost:5000"
    const notesInitial = [];


const [notes ,setnotes] = useState(notesInitial);
 //  add a note
const getNotes =async()=>{
  

    //  api calls start here 
    const response = await fetch(`${host}/api/notes/getuserdata`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.token  
      },
    
    });
    const json = await response.json();
    // eslint-disable-next-line
    setnotes(json)
};


//  add a note
const addNote = async(title,description,tag)=>{

    //  api calls start here
    // eslint-disable-next-line 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.token  
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const note = await response.json();
    setnotes(notes.concat(note))
    props.showalert("success","your note is added")
};
// delete a note 
const deleteNote =async(id)=>{
   //  api calls
   const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.token  
    },
  });
  // eslint-disable-next-line
  const json = await response.json();
  
    const newnotes = notes.filter((no)=>{return no._id !== id});
    setnotes(newnotes);
    props.showalert("success","your note is deleted")
};


// edit a node 
const editNote = async(id,title,description,tag)=>{
 
  
    //  api calls
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.token  
          },
         
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        // eslint-disable-next-line
     
  
      let updatedNewNote =  JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < notes.length; index++) {
        const element = updatedNewNote[index];
        if(element._id === id){
          updatedNewNote[index].title = title;
          updatedNewNote[index].description = description;
          updatedNewNote[index].tag = tag;
          break;
        }
       
    }
    setnotes(updatedNewNote);
    props.showalert("success","your note is updated")
};
    return(
        <>
        <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
        </noteContext.Provider>
        </>
    )
}

export default Notestate;