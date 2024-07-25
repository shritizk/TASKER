const mongoose = require("mongoose");
require('dotenv').config();
const URL = process.env.URL;
mongoose.connect(process.env.URL);

const taskSchema = mongoose.Schema({
    email : String,
    date :  String , 
    title : String ,
    description: String ,
    status : {type : Boolean , default : false}
});

const taskDB = mongoose.model("taskDB",taskSchema);

module.exports = {
    taskDB
}