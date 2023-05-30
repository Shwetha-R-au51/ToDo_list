import React from 'react';
import TaskNav from './Tasknav';
import "./style/addtask.css";
import { useEffect,useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

const TaskDescription = () =>{
    const { id } = useParams("");
    console.log(id);

    const history = useNavigate();

    const [gettaskdata, setTaskdata] = useState([]);

    const getdata = async () => {

        const res = await fetch(`http://localhost:7000/gettasks/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setTaskdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    },[]);
    

    const deletetask = async (id) => {

        const res2 = await fetch(`http://localhost:7000/deletetask/${id}`, {
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
            console.log("user deleted");
           
        }

    }





    return(
        <>
        <TaskNav />
        <div className='task-list'>
        <div className='title'>
            {gettaskdata.taskname}
        </div>
        <div className='description'>
            {gettaskdata.taskdescription}
        </div>
        <div className='taskdetailbtns'>
            <button type="submit" id="task-btn" onClick={() => getdata(gettaskdata._id)}>Edit</button>
                                               
            <button type="submit" id="task-btn" onClick={() => deletetask(gettaskdata._id)}>Delete</button>
        </div>      
    </div>
                                   

            
        
        
        </>
    );
}
export default TaskDescription;