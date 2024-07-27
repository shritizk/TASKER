const {Router} = require("express");
const { taskDB } = require("../db/taskDb");
const router = Router();
const { jwtVerify } = require('../auth/jwtVerify');



// api 
//"http://localhost:3000/home/taskList"
// tested DONE 
//get 
router.get("/gettask",async function(req,res){
    const payload = req.cookies.token.data;
    
    return res.send("hello")
    // try{
    //     const payloaddata = await taskDB.find({email : payload.email});
    // return res.status(200).json({
    //     tasklist : payloaddata
    // });
    // }catch{
    //     return res.status(401).json({
    //         msg : "something wrong with db can not get data !!"
    //     })
    // }

});
//post
router.post('/addtask',jwtVerify,async function(req,res){
    // db schema 
    // date :  Date , 
    // title : String ,
    // description: String ,
    // status : Boolean
    const payloaddata = req.body;
    const payload = req.cookies.token.data;
    const date = new Date().toLocaleDateString() 

    try { 
        
        await taskDB.create({
            email : payload.emaol ,
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
//put 
router.put('/updatetask',jwtVerify,async function(req,res){
    // change status from false to true
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
    const payloaddata = req.body._id; // might need to chane _id to something else will check it when testing 
    try{
        await taskDB.deleteOne({
            _id : payloaddata
        });
        return res.status(202)
    }catch{
        return res.status(401).json({
            msg : "something went wrong!! "
        })
    }
})


module.exports = {
    taskrouter : router
}
