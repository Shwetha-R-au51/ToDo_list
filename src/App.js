import React from "react";
import {Routes,Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import TaskNav from "./components/Tasknav";
const App=()=>{
  return(
    <>
    
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Tasks" element={<Tasks />} />
      <Route path="/AddTask" element={<AddTask />} />
      <Route path="/DeleteAll" element={<TaskNav />} />




    </Routes>
    </>
  );
}

export default App;