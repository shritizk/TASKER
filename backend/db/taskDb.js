const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.URL);

const taskSchema = mongoose.Schema({
    date :  Date , 
    title : String ,
    description: String ,
    status : {type : Boolean , default : false}
});

const taskDB = mongoose.model("taskDB",taskSchema);

module.exports = {
    taskDB
}