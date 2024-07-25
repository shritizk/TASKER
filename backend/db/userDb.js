const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.URL);


const userSchema = mongoose.Schema({
    name : String , 
    email  : String ,
    password : String , 
    Location : {
        country : String , 
        state : String 
    } 
});


export const userDb = mongoose.model("userData",userSchema);