const {Router} = require("express");
const { taskDB } = require("../db/taskDb");
const router = Router();
const { jwtVerify } = require('../auth/jwtVerify');



// api 
//"http://localhost:3000/task/"
// tested DONE 

//post
router.post('/addtask',jwtVerify,async function(req,res){
    // db schema 
    // email ; String ,s
    // date :  Date , 
    // title : String ,
    // description: String ,
    // status : Boolean
    const payloaddata = req.body;
    const payload = req.cookies.token.data;
    const date = new Date().toLocaleDateString() 

    try { 
        
        await taskDB.create({
            email : payloaddata.email ,
            date :  date ,
            title : payloaddata.title , 
            description : payloaddata.description 
        })
        
       
        return res.status(200).json({
            msg : "created"
        })
    }catch(e){
        console.log(e)
        return res.status(401).json({
            msg : " something went wrong "
        })
    }
});
//get 
router.get("/gettask",jwtVerify,async function(req,res){
    const payload = req.cookies.token.data; // it will take email from cookie only ,  we will also check if cookie in there in front end and if yes great , request will be bounced . 
    // also the cookie will go through jwt Verification

    //Testing :-
    // const payload = req.body; // for testing only 
   
    try{
        const payloaddata = await taskDB.find({email : payload.email});
    return res.status(200).json({
        tasklist : payloaddata
    });
    }catch(e){
        console.log(e);
        return res.status(401).json({
            msg : "something wrong with db can not get data !!"
        })
    }

});

//put 
router.put('/updatetask',jwtVerify,async function(req,res){
    // change status from false to true

    // here testing will be done only from front end 
    
    const payload = req.cookies.token.data;
    const taskid = req.body._id
    try { 
        await taskDB.findAndUpdateOne({
            email : payload.email  ,_id : taskid 
        },{
            status  : true 
        });    
        return res.status(200)
    }catch{
        return res.status(401).json({
            msg : "something went wrong!! "
        })
    }
});

//remove
router.delete('/deletetask',async function(req,res){
    const payloaddata = req.body._id; 
    // this id will be send via a button associated with the field in db
    try{
        await taskDB.deleteOne({
            _id : payloaddata
        });
        return res.status(200).json({
            msg : "deleted" , 
            _id : payloaddata
        })
    }catch{
        return res.status(401).json({
            msg : "something went wrong!! "
        })
    }
})


module.exports = {
    taskrouter : router
}
