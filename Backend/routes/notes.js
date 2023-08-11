const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuserdetails'); //it is middleware function use to authenticate the logged in user
const Notes = require('../models/Notes');
const { closeSync } = require('fs');


// Routes 1: get all the notes using : Get : "api/notes/fetchallnotes" : user login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    const errors = validationResult('req');
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})  
     }
     try {
        const notes = await Notes.find({user: req.user}); 
    console.log("Fetched Notes:", notes); // Log the fetched notes
    res.json(notes);
     } catch (error) {
        console.error(error.message);
        return res.status(500).send('internal Server Error' + error.stack);
    }
    
})



// Rotuter 2: get the Add all the notes using: post : "/api/notes/addnote" : user login required
router.post('/addnote',fetchuser,[
   body('title','enter more then 5 character').isLength({min:5}),
   body('description','enter more then 5 character').isLength({min:5})

],async(req,res)=>{

    try {
        const {title, tag, description} = req.body // destructuring
        const errors = validationResult(req); // Correct
        if (!errors.isEmpty()) {
          return res.status(400).json({errors:errors.array()});
        }
        console.log(req.user)
        const savenotes = await new Notes({
            title,
            tag,
            description, 
            user: req.user
        });
        console.log(savenotes.title)
        const sasve = await savenotes.save();
        res.json(sasve);
    } catch (error) {
        return res.status(500).send('Server Error'+ error.stack);
    }
   

})

// Rotute3 used to update the particular note: put :"/api/notes/updatenote":user login required
// for updation  alway use the Put request 
router.put('/updatenote/:id',fetchuser, async(req,res)=>{
    const {title,tag,description}=req.body; // get all value from request body.
    
     

    try {
      // create a new note object ...
     const newnote ={};
     if(title){newnote.title = title};
     if(tag){newnote.tag = tag};
     if(description){newnote.description = description};
    
     // check the note is exist or not & find the note that need to be updated..  
     let notes = await Notes.findById(req.params.id); 
     if(!notes){
         return res.status(404).send('note not found');
     }
     
     // check whether the note being updated belongs to the currently authenticated user or not
     if(notes.user.toString() !== req.user){ //req.user -> it contains the current user's id & the req body come from fetchuser middle ware that authenticate the user  
         return res.status(401).send('acess denied');
     }
     //here the note is update...
     notes= await Notes.findByIdAndUpdate(req.params.id,{$set: newnote},{new:true});
      //findByIdAndUpdate: This is a Mongoose method used to find a document by its unique _id field and update it in a single operation. It takes three main arguments:
 
      // req.params.id: This is the value of the id parameter from the URL. It's the unique identifier of the note you want to update.
 
      // {$set: newnote}: This is the update object. It uses the $set operator to update specific fields in the document. newnote is the object containing the updated values for the fields like title, tag, and description.
 
      // { new: true }: This option tells Mongoose to return the updated document as the result of the operation. Without this option, the default behavior is to return the document as it was before the update.
      res.json(notes);

    } catch (error){
       return res.status(500).send("internal server error:"+ error.stack);   
    }      
})


//Route 4: used to delete an existing note : delete : "/api/notes/deletenote" : user login required.
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    
    try {
        //find the the note is exist or not ...
        const note = await Notes.findById(req.params.id);
    
        if(!note){
            return res.status(404).send("page note found");
        }

        // check wheater note being deleted belongs to the currently authenticate user or not.
        if(note.user.toString() !== req.user){// req.user -> from fetchuser that store the current user's id 
        return res.status(401).send('access denied');
        }

    } catch (error) {
       return res.status(500).send('internal Server error:' + error.stack); 
    }
    
    // Delete existing note 
    const deletenote = await Notes.findByIdAndDelete(req.params.id);
    console.log('Delete note sucessfully');
    console.log(deletenote);
})

module.exports = router;
