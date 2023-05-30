import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const Login = () =>{
   
       
    const history=useNavigate();
    const [username,setUname]=useState("");
    const [password,setPassword]=useState("");

    const handleSubmit =async(e)=>{
        e.preventDefault();
       try{
        Axios.post('http://localhost:7000/login',{
            name:username,
            password:password
            
        }).then(res=>{
            if(res.data==="exist"){
                history("/Tasks");
            }
            else{
                alert("Please register to login in to the website");
                history("/");
            }
        })
    }
    catch(err){
        console.log(err);
    }
    }
   

    
   
    return(
        <>
         
        <Navbar />
        <div  className="user-part">
        <div className="user-details">
            <br/>
        <h2>User Login</h2>
        <br/>
        <form method="POST" onSubmit={handleSubmit}>
        <div className='login-container'>
            <label for="Firstname">User Name:</label>
            <input type="email" placeholder='Enter username' 
             onChange={(e) => {setUname(e.target.value)}} required/><br/>
            <br/>
            <label for="password">Password:</label>
            <input type="text" placeholder='Enter password'
            onChange={(e) => {setPassword(e.target.value)}}  required/><br/>
            <br/>
           <input type="submit" id="submit-btn" value="Submit" />
        </div>
        <br/>
      
        </form>
        </div>
        </div>
        
      
        </>
    );
}

export default Login;