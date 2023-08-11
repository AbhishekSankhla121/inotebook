const JWT = require('jsonwebtoken');
const JWT_secretKey ='this-is-secretkey-of-json-web-token'; 

const user=(req,res,next)=>{
    const token = req.header('auth-token');
   
    if(!token){
        
        res.status(401).json('acess deny 1');
    }
    try {
    const data = JWT.verify(token,JWT_secretKey);
    req.user = data.user.id;
    next()
    } catch (error) {
        return res.status(500).json({error:error});
    }
    
}
module.exports = user;