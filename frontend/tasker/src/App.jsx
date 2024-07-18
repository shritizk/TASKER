
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
"http://localhost:3000/taskList"
function App() {

  const [date , setDate] = useState({date : 1000});
 useEffect(()=>{
  axios.get("http://localhost:3000/home/tasklist").then(
    (e)=>{
      console.log(e)
      setDate(e.data)
    }
  )
 },[date])

  return (
    <>
      {date.date}
    </>
  )
}

export default App
