import React from 'react'

export default function NoteItem(props){
    const {notes} = props; 
    return(
        <>
        <div className='col-md-3'>
       <div className="card my-3">
 
  <div className="card-body">
    <div className="d-flex align-items-center">
    <h5 className="card-title  mx-2">{notes.title}</h5>
    <i className="fa-sharp fa-solid fa-trash fa-bounce mx-2"></i>
<i className="fa-solid fa-pen-to-square mx-2"></i>
    </div>
    
    <p className="card-text">{notes.description} Card titles are used by adding .card-title to a  tag. In the same way, links are added and placed next to each other by adding .card-link to an  tag.
Subtitles are used by adding a .card-subtitle to a  tag. If the .card-title and the .card-subtitle items are placed in a .card-body item, the card title and subtitle are aligned nicely </p>
   
  </div>    
</div>
</div>
       </>
    )
}