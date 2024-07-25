const {Router} = require('express');
const { userDb } = require('../db/userDb');
const router = Router();
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
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
    if(await userDb.find({email : payLoad.email})){
        return res.status(404).json({
            status : 404 , 
            msg : "email already exist !!"
        })
    }

    await userDb.create({
        name : payLoad.name , 
        email : payLoad.email , 
        password : bcrypt.hash(payLoad.password, 10) , 
        location : payLoad.location 
    }).catch(()=>{
        return res.status(401).json({
            status : false , 
            msg : "can not create user right now!!"
        })
    });


    return res.status(200).json({
        status : true , 
        msg : "user Created!!"
    })

})

//login
router.get('/login',async function(req,res){
    const payLoad = req.body;
    const userData = await userDb.find({email : payLoad.email}).catch((e)=>{
        return res.status(404).json({
            status : false , 
            msg : "emai not found !!!"
        })
    })
    

    
    // check for password if its correct 
            
    bcrypt.compare(payLoad.password, userData.password, function(err, result) {
        if(err){
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
       
});



// user want to change something 
// jwtverify will make sure if token is correct or not 
router.post("/updateUseremail",jwtVerify,async function(req,res){
    const payLoad = req.body ; 
    await userDb.findOneAndUpdate({email : payLoad.email},{
        name : payLoad.name , 
        email : payLoad.email , 
        password : bcrypt.hash(payLoad.password, 10) , 
        location : payLoad.location
    })

    return res.status(200).json({
        status : true , 
        msg : "updated !!"
    })

})



module.exports = {
    userRoutes : router
}