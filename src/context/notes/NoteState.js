// Basic structure of Context Api.
import React, { useState }  from "react";

import noteContext from "./noteContext";


const Notestate =(props)=>{
    const notesInitial = [
        {
            "_id": "65374f4901aec7f0b0c7662d",
            "user": "653579b359a64133e061a1fd",
            "title": "myproject",
            "description": "this is my h timeehehheheheheheh adding a new postman new request",
            "tag": "persnal",
            "date": "2023-10-24T04:59:53.809Z",
            "__v": 0
        },
        {
            "_id": "6537f9960508d4ae282b453a",
            "user": "653579b359a64133e061a1fd",
            "title": "this is an exmple ",
            "description": "Kindly please ignoree it .",
            "tag": "persnal",
            "date": "2023-10-24T17:06:30.911Z",
            "__v": 0
        },
        {
            "_id": "6537f9960508d4ae282b454a",
            "user": "653579b359a64133e061a1fd",
            "title": "this is an exmple ",
            "description": "Kindly please ignoree it .",
            "tag": "persnal",
            "date": "2023-10-24T17:06:30.911Z",
            "__v": 0
        },
        {
            "_id": "6537f9960508d4ae282b455a",
            "user": "653579b359a64133e061a1fd",
            "title": "this is an exmple ",
            "description": "Kindly please ignoree it .",
            "tag": "persnal",
            "date": "2023-10-24T17:06:30.911Z",
            "__v": 0
        },
        {
            "_id": "6537f9960508d4ae282b456a",
            "user": "653579b359a64133e061a1fd",
            "title": "this is an exmple ",
            "description": "Kindly please ignoree it .",
            "tag": "persnal",
            "date": "2023-10-24T17:06:30.911Z",
            "__v": 0
        }
    ];
const [notes ,setnotes] = useState(notesInitial);
    return(
        <>
        <noteContext.Provider value={{notes,setnotes}}>
        {props.children}
        </noteContext.Provider>
        </>
    )
}

export default Notestate;