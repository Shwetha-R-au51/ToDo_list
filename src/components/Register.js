import React from "react";
import Axios from "axios";
import { useState } from "react";
import "./style/login.css";
import Navbar from "./Navbar";

const Register = () =>{
    
       
    
    const [username,setUname]=useState("");
    const [password,setPassword]=useState("");

    const handleSubmit =async(e)=>{
        e.preventDefault();
       
        Axios.post('http://localhost:7000/userdetails',{
            name:username,
            password:password,
            
        })
    }
   
    return(
        <>
         
        <Navbar />
        <div  className="user-part">
        <div className="user-details">
            <br/>
        <h2>User Register</h2>
        <br/>
        <form method="POST" onSubmit={handleSubmit}>
        <div className='login-container'>
            <label for="Firstname">User Name:</label>
            <input type="text" placeholder='Enter username' 
             onChange={(e) => {setUname(e.target.value)}}/><br/>
            <br/>
            <label for="password">Password:</label>
            <input type="text" placeholder='Enter password'
            onChange={(e) => {setPassword(e.target.value)}}/><br/>
            <br/>
           <input type="submit" id="submit-btn" value="Submit" />
        </div>
        <br/>
       <div className="login-part">
        <h5>Already Registered <a href="/login">Click here to Login</a></h5>
       </div>
        </form>
        </div>
        </div>
        
      
        </>
    );
}

export default Register;