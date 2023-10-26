const jwt = require('jsonwebtoken');
const fetchuser =(req,res,next)=>{

const JWT_secretKey = "this-is-json-secret-key";
 
// get the user from the jwt token and add id to req object

// we send the auth-token  through headeer in postman
//auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZjg5YTg0NGZhMDUzMDlkMWNiNzM4In0sImlhdCI6MTY5MTQ0MDc5MH0.VbOGNGYvG8CYg4tSS11n8XVssRe57biimraI72xLPVA
const token = req.header('auth-token'); 
    
    
    
    // if the token is not found it shows error
    if(!token){
        // 401 status is used for acess denined 
        res.status(401).json("please authenticate using  vaild token 1");
    }
    try {
        
        // If the verification is successful, the 'data' object contains the payload
        const data = jwt.verify(token,JWT_secretKey);
        req.user = data.user.id; // it store the user object in request body 
        next()
    
    } catch (error) {
        res.status(401).json("please authenticate using  vaild token");
    }
    

}
module.exports = fetchuser;