import React, { useContext } from 'react';
import NoteItem from './NoteItem';
import noteContext from '../context/notes/noteContext';
export default function Notes () {
    const Context = useContext(noteContext);
    const {notes ,setnotes} = Context;
  return (
    <>
    <div className="row my-5">  
        <h2>Your Notes</h2>
        {notes.map((notes)=>{
          return <NoteItem key={notes._id} notes = {notes}/>;
        })}
    </div>
    </>
  )
}
