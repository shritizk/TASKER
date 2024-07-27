const {Router} = require('express');
const { userDb } = require('../db/userDb');
const router = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtVerify } = require('../auth/jwtVerify');
const SecretKey = process.env.SecretKey;

// apis 

//signup
router.post('/signup',async function(req,res){
   
    const payLoad = req.body;
    // user data base format 
    // name : String , 
    // email  : String ,
    // password : String , 
    // Location : {
    //     country : String , 
    //     state : String 
    // } 

    // check if email already exist in db
    const searchResult = await userDb.exists({email : payLoad.email})
    if(searchResult){
        return res.status(404).json({
            status : 404 , 
            msg : "email already exist !!"
        })
    }
    
    try{
        const password = bcrypt.hashSync(payLoad.password , 10) ;
        await userDb.create({
        name : payLoad.name , 
        email : payLoad.email , 
        password : password , 
        location : payLoad.location 
    })}
    catch(e){
        console.log(e);
        return res.status(401).json({
        status : false , 
        msg : "can not create user right now!!"
    }) } 

    return res.status(200).json({
        status : true , 
        msg : "user Created!!"
    })

})

//login
router.get('/login',async function(req,res){
    const payLoad = req.body;
    if(!userDb.exists({email : payLoad.email})){
        return res.json(404).json({
            status : false , 
            msg : "user does not exits!!!"
        })
    }
    const userData = await userDb.find({email : payLoad.email});
    // check for password if its correct 
    console.log(userData[0].password);
    const passwordResult = bcrypt.compareSync(payLoad.password, userData[0].password );
        if(!passwordResult){
        
            return res.status(404).json({
                msg : "password incorrect!!!"
            })}

        // provide a jwt 
        // send back  a jwt
        
        const token = jwt.sign({
            data : payLoad , 
            },SecretKey )
        
        return res.cookie("token" , token ,{ HttpOnly: true , secure: true , maxAge : 24 * 60 * 1000});
    });
       




// user want to change something 
// jwtverify will make sure if token is correct or not 
router.post("/updateUseremail",jwtVerify,async function(req,res){
    const payLoad = req.body ; 
    await userDb.findOneAndUpdate({email : payLoad.email},{
        name : payLoad.name , 
        email : payLoad.email , 
        password : bcrypt.hashSync(payLoad.password, 10) , 
        location : payLoad.location
    })

    return res.status(200).json({
        status : true , 
        msg : "updated !!"
    })

})



module.exports = {
    router
}