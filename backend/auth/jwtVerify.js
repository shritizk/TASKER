require('dotenv').config();
const SecretKey = process.env.SecretKey;
const jwt = require('jsonwebtoken');
function jwtVerify(req,res,next){
    const cookie = req.cookie.token.data;
    if(jwt.verify(cookie,SecretKey)){
        return next()
    }else{
        return  res.status(404).json({
            status : false , 
            msg : "token is wrong"
        })
    }
}


module.exports = {
    jwtVerify
}