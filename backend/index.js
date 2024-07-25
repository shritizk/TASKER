const express = require("express");
const { taskrouter } = require("./routes/taskRoutes");
const app = express();
const cors = require("cors");
app.use(cors())
app.use(express.json())

app.use("",taskrouter)

app.listen(3000,()=>{
    console.log("back end online at port 3000")
})