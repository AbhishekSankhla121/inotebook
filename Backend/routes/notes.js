const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require('../models/Notes');
const {body,validationResult} = require('express-validator');

// router1 : get alll the user data : get : 'api/notes/getuserdata'
router.get('/getuserdata',fetchuser,async(req,res)=>{
    try {
    const note = await Notes.find({user:req.user});
    res.json(note);
    } catch (error) {
        console.log(error.stack);
        return res.status(400).json(error.message)
    }
    
})


//router 2 : add  the user's note:post : '/api/notes/addnote'
router.post('/addnote',fetchuser,[
    body('title','please enter the valid title').isLength({min:5}),
    body('description','please enter the valid description').isLength({min:5})
],async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    try {
      const {title,description,tag}= req.body
      const note = await new Notes({
        title,description,tag,user:req.user
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
        return res.status(400).json(error.message);
    }
      
});

// Router 3 : update an existing note : put :'api/notes/updatenote': login require ..
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
   try {
    // get fetch the data using the note id..
    const   note =await Notes.findById(req.params.id);
    
    // check the note is exist or not ...
    if(!note){
        return res.status(404).send('not Found');
    }
    
    // checck wheater the user is authorize to update to note or not.
    if(note.user.toString() !== req.user){
        return res.send(401).send('access Deny');
    }
   
    //else update the user's note..
    const {title,tag,description} = req.body;
    const newnote = {} //-> oject
    if(title){newnote.title = title};
    if(tag){newnote.tag = tag};
    if(description){newnote.description = description};
    
    let updatenote = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.send(updatenote);

   } catch (error) {
    res.status(400).json("internal server issue: "+error.stack);
   }


});

// rotue3 : delete an existing note : delete : 'api/notes/deletenote': user login required.
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try {
        // check note exist or not 
    const note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send('page not found');
    }
    // check wheater note being deleted belongs to currently authenticate user or not..
    if(note.user.toString() !== req.user){
        return res.status(401).send('access  denied');
    }

    //delete an existing note ..
    const deletenote = await Notes.findByIdAndDelete(req.params.id);
     console.log("delete sucessfully");
    res.json(deletenote);
    } catch (error) {
        return res.status(500).send('internal server Error:'+ error.stack);
    }
    
}) 
module.exports = router
