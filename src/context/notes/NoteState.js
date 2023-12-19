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
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzNTc5YjM1OWE2NDEzM2UwNjFhMWZkIn0sImlhdCI6MTY5ODAwMzM5MX0.bgoI32MTvkR0a7R24in8SUJoYtyizCCRjVKJ18o8g48"  
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
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzNTc5YjM1OWE2NDEzM2UwNjFhMWZkIn0sImlhdCI6MTY5ODAwMzM5MX0.bgoI32MTvkR0a7R24in8SUJoYtyizCCRjVKJ18o8g48"  
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const note = await response.json();
    setnotes(notes.concat(note))
};
// delete a note 
const deleteNote =async(id)=>{
   //  api calls
   const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzNTc5YjM1OWE2NDEzM2UwNjFhMWZkIn0sImlhdCI6MTY5ODAwMzM5MX0.bgoI32MTvkR0a7R24in8SUJoYtyizCCRjVKJ18o8g48"  
    },
  });
  // eslint-disable-next-line
  const json = await response.json();
  
    const newnotes = notes.filter((no)=>{return no._id !== id});
    setnotes(newnotes);
};


// edit a node 
const editNote = async(id,title,description,tag)=>{
 
  
    //  api calls
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzNTc5YjM1OWE2NDEzM2UwNjFhMWZkIn0sImlhdCI6MTY5ODAwMzM5MX0.bgoI32MTvkR0a7R24in8SUJoYtyizCCRjVKJ18o8g48"  
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