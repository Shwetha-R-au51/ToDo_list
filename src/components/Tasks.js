import React from 'react';
import TaskNav from './Tasknav';
import "./style/addtask.css";
import { useEffect,useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import TaskDescription from './TaskDescription';
const Tasks = () =>{
    
    const history = useNavigate();

    const [gettaskdata, setTaskdata] = useState([]);
    const [gettaskStatus, setTaskStatus] = useState("");


    const getdata = async () => {

        const res = await fetch(`http://localhost:7000/tasks`, {
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
    const { id } = useParams("");
    console.log(id);
    const getStatus = async () => {
        const status=gettaskStatus;
        const res = await fetch(`http://localhost:7000/updatestatus/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setTaskStatus(data)
            console.log("get data");
           
        }
    }

    useEffect((e)=>{
        getStatus();
    },[gettaskStatus]);

    function TaskDescription(){
        <TaskDescription />
    }


    return(
        <>
        <TaskNav />
        <div className='task-list'>
        <table id="tasks">
            <thead>
            <tr>
            <th>id</th>
            <th>Title</th>
            <th>Status</th>
            
            </tr>
            </thead>
            <tbody>
            {
            gettaskdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td onClick={TaskDescription()}>{element.taskname}</td>
                                                <td><input type="checkbox" name="status" value="Active" onChange={(e) => {setTaskStatus(e.target.value)}} /><label for="Active" >     Active</label><br/>
                                                <input type="checkbox" name="status" value="Completed" onChange={(e) => {setTaskStatus(e.target.value)}} /><label for="completed">  Completed</label></td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>

            
        
        </div>
        </>
    );
}
export default Tasks;