const express = require("express");
const { taskrouter } = require("./routes/taskRoutes");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

app.use(cors())
app.use(express.json())

app.use(cookieParser());
app.use("/task",taskrouter)
app.use('/user',userRoutes)
app.listen(3000,()=>{
    console.log("back end online at port 3000")
})