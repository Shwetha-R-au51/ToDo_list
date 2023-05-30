import React from 'react';
import { useNavigate } from 'react-router-dom';
const TaskNav = () =>{
    
    const history=useNavigate();
    async function setDeleteAll(){

        const res2 = await fetch("http://localhost:7000/deleteAll", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            history("/Tasks");
            console.log("tasks deleted");
           
        }

    }
    



    return(
        <>
         <div className="tasknav-bar">
            <h4 style={{padding:'10px',color:'whitesmoke',fontSize:'1.3rem'}}>Tasks</h4>
            <input type="search" placeholder='Search for the tile'  />
            <div class="Menu">
            <button class="Menubtn">Menu</button>
            <div class="menu-content">
            <a href="/AddTask">Add Task</a>
            
            <a href="/DeleteAll" onClick={()=>{setDeleteAll()}}>Delete All</a>
            <a href="/Tasks">All Tasks</a>
            <a href="/ActiveTasks">Active Tasks</a>
            <a href="/CompletedTasks">Completed Tasks</a>
            </div>
        </div>
        </div>
        </>
    );
}
export default TaskNav;