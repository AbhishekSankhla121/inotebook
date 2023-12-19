import React,{ useContext } from 'react';
import noteContext from '../context/notes/noteContext';
export default function NoteItem(props){
  const context = useContext(noteContext);
  const {deleteNote} = context;
    const {notes ,updateNote} = props; 
    return(
        <>
        <div className='col-md-3'>
       <div className="card my-3">
 
  <div className="card-body">
    <div className="d-flex align-items-center">
    <h5 className="card-title  mx-2">{notes.title}</h5>
    <i className="fa-sharp fa-solid fa-trash fa-bounce mx-2" onClick={()=>{deleteNote(notes._id)}}></i>
<i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(notes)}}></i>
    </div>
    
    <p className="card-text">{notes.description}</p>
   
  </div>    
</div>
</div>
       </>
    )
}