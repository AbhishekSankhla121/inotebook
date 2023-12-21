const express = require('express');
const routeer = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userinfo = require('../middleware/fetchuser')


const JWT_secretKey = "this-is-json-secret-key";

// Router:1 create a User using:POST "/api/auth/createuser" : no login required
routeer.post('/createuser',[
      body('name','enter a valid  name ').isLength({min:3}),
      body('email','enter a valid email').isEmail(),
      body('password','enter a valid length password ').isLength({min:5})

],async(req,res)=>{
  // if there are errors , return bad request and the errors
    let  success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() ,success});
      } 

  
  try {
    // check wheater the user with this email exist already
    let user =await User.findOne({email: req.body.email})
    if(user){
      return res.status(400).json({error: "sorry a user with this email is already exist", success})
    }
       const salt = await bcrypt.genSalt(10);
       const securePassword = await bcrypt.hash(req.body.password,salt);
       user =await User.create({
          name: req.body.name,
          email: req.body.email,
          password: securePassword,
        })
        
    // make a user authentication token using json-web-token.
    const data ={
      user:{
        id: user.id
      }
    }
    const JWT_data = jwt.sign(data,JWT_secretKey);
    success = true;
    
    res.json({JWT_data,success});

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error is  Occured", success);
  }  

})   


// Authenticate  a User using:POST "/api/auth/loginuser" : no login required
routeer.post('/userlogin',[
  body('email','enter valid email').isEmail(),
  body('password','please enter the password').exists()
], async(req,res) => {
// if there are errors, return Bad request & the errors 
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {email,password} = req.body;
  let success= false;
  try {
    const user =await  User.findOne({email});
    if(!user){  
      return res.status(400).json({error:"Please Enter the vaild credential"});
    }
    const checkpass = await bcrypt.compare(password, user.password);
    if(!checkpass){
      return res.status(400).json({error:"please Enter the valid credential"});
    }
  
   // make a user authentication token using json-web-token.
   const data ={
    user:{
      id: user.id
    }
  }
  success = true;
  const JWT_data = jwt.sign(data,JWT_secretKey);
  res.json({success,JWT_data});
  
    
  }catch (error) {
    console.error(error.message);
    res.status(500).send( success,error.message,"internal  error login routes");
  }

  
})


// routes3 : Get the loggedin user details: api/auth/userdetails : login required 
routeer.post('/getuserdetails',userinfo,async (req,res)=>{

  try {

     const userId = req.user; //get user.id objeect through req body from fetchuser.js file
    const user = await User.findById(userId).select('-password'); //it fecth all the user data  from data base except "password"
    
    res.send(user);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error1");

  }

}) 
module.exports = routeer
 