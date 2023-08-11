const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuserdetails');

// this use in .eval.js to secure the secreate
const JWT_secretKey ='this-is-secretkey-of-json-web-token';  

//Route 1-> create a user : post "api/auth/creatteuser" 
router.post('/createuser',[
   body('name','Enter a vaild name ').isLength({min:5}),
   body('email','Enter a vaild Email.com').isEmail(),
   body('password','password must me atleast 5 character').isLength({min:5})
],async(req,res)=>{  
     
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   try {
      let user = await User.findOne({email: req.body.email})
   if(user){
      return res.status(400).json({error:"this email is already exist"});
   }
   //  make the password hashing using bycrpt library
   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(req.body.password,salt);
   console.log(hash);

   user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash, 
    })

   // make jwt authentication token for the user 

   // data is object that contain the user id
   const data = { 
      
      user:{
       id: user.id
      }}
   // it jwtdata  contain the Token key
   const jwtdata = jwt.sign(data,JWT_secretKey);
   
    
   //  .then(user => res.json(user))
   //  .catch(err =>
   //   res.json({error:'please enter  unique email',message: err.message}))
   
   } catch (error) {
      res.status(500).send('some internal error is occured ');
   }
   
})



// Route:2-> to check the login credential : post : "/api/auth/userlogin"
router.post('/userlogin',[
   body('email','please enter valid').isEmail(),
   body('password','password cannot be empty').exists()

],async(req,res)=>{
   
   const valid = validationResult(req);
   
   if(!valid.isEmpty()){
   return res.status(400).json({error: valid.array()});
   }
   try {
      const {email,password} = req.body;
   const userEmailCheck  = await User.findOne({email});
   if(!userEmailCheck){
      return res.status(400).json({error:"please enter valid credentials"});
   }
   const userPasswordCheck = await bcrypt.compare(password,userEmailCheck.password);
   if(!userPasswordCheck){
      return res.status(400).json({error:"please enter valid credentials"});
   }

   const data ={
      user:{
         id: userEmailCheck.id
      }
   }
   const Token = jwt.sign(data,JWT_secretKey);
   res.json({Token:Token});
   } catch (error) {
     return res.status(500).json({error:error.array()});
   }

})


//Route 3  fetch the user's information :post: 'api/auth/userdetails' : required user loggedin
router.post('/userdetails',fetchuser,async(req,res)=>{
   const userID = req.user
   const userdata =await User.findById(userID).select('-password');
   res.json(userdata);
});
module.exports = router 
