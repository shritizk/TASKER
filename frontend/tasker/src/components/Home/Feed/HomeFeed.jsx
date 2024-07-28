

import { useState } from "react";
import axios from "axios";



    
 
const HomeFeed = async ()=>{
    const [task,settask] = useState([]);
    // console.log(import.meta.env.VITE_getTaskUrl)
    await axios(import.meta.env.VITE_getTaskUrl).then((e)=>{settask(e)})
   // this is format of task that we are getting 
   // we need to return date , titile and description
         /* email : String,
    date :  String , 
    title : String ,
    description: String ,
    status : {type : Boolean , default : false */
    
     task.map((e)=>{
         return <div className={e._id}>
            <div className="taskdate">{e.date}</div>
            <div className="tasktitle">{e.title}</div>
            <div className="taskdescription">{e.description}</div>
            <button className='taskStatus'>{e.status}</button>
         </div>
     })

        return <>{task}</>
    }


export default HomeFeed