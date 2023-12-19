import React, { useContext, useEffect, useRef, useState } from 'react';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import noteContext from '../context/notes/noteContext';
export default function Notes () {
  const ref= useRef(null);
  const refclose = useRef(null);
  const [note,setnote] = useState({id:"",etitle:"",edescription:"",etag:""})
    const Context = useContext(noteContext);
    const {notes,getNotes,editNote} = Context;
    useEffect(() => {
      getNotes()
    }, []);
    const updateNote = (currentnote)=>{
       ref.current.click()
       setnote({id:currentnote._id,etitle:currentnote.title,edescription: currentnote.description,etag:currentnote.tag})
    };
    const handleClick =(e)=>{
      editNote(note.id,note.etitle,note.edescription,note.etag)
      refclose.current.click();
     

  }
  const onChange =(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
  
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade"  id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note:</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title: </label>
    <input type="text" className="form-control" id="etitle" name ="etitle"aria-describedby="emailHelp" value={note.etitle} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Description: </label>
    <input type="text" className="form-control" id="edescription" name = "edescription" value={note.edescription} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag: </label>
    <input type="text" className="form-control" id="etag" name = "etag" value={note.etag} onChange={onChange}/>
  </div>
 
</form>
      </div>
      <div className="modal-footer">
        <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length < 5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    <AddNote/>
    <div className="row my-5">  
        <h2>Your Notes</h2>

        <div className="container d-block">

        <strong><p>
        {notes.length ===0 && "No Notes to Display"}
        </p></strong></div>
        {notes.map((notes)=>{
         
          return <NoteItem key={notes._id} notes = {notes} updateNote={updateNote}/>;
        })}
    </div>
    </>
  )
} 
