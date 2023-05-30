import React from "react";
import Axios from "axios";
import { useState } from "react";
import TaskNav from "./Tasknav";
import "./style/addtask.css";
import { useNavigate } from "react-router-dom";
const AddTask = () =>{
   const history=useNavigate();
       
    const [tasktitle,setTitle]=useState("");
    const [taskdescription,setDescription]=useState("");

    const handleSubmit =async(e)=>{
        e.preventDefault();
       try{
        await Axios.post('http://localhost:7000/addtask',{
            title:tasktitle,
            description:taskdescription
            
        }).then(res=>{
            if(res.data==="added"){
                alert("task added successfully");
                history("/Tasks");
            }
        })
    }
    catch(err){
        console.log(err);
    }
    }
    
   

    
   
    return(
        <>
         
       <TaskNav />
        <div  className="task-part">
        <div className="task-details">
            <br/>
        <h2>User Login</h2>
        <br/>
        <form method="POST" onSubmit={handleSubmit}>
        <div className='task-container'>
            <label for="tasktitle">Task Title:</label>
            <input type="text" placeholder='Enter the Task Title' id="title"
             onChange={(e) => {setTitle(e.target.value)}} required/><br/>
            <br/>
            <label for="taskdescription">Task Description:</label>
            <input type="textarea" placeholder='Enter Task Description' id="description"
            onChange={(e) => {setDescription(e.target.value)}}  required/><br/>
            <br/>
           <input type="submit" id="submit-btn" value="Add Task" />
        </div>
        <br/>
      
        </form>
        </div>
        </div>
        
      
        </>
    );
}

export default AddTask;