import express from "express";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskname: {
        type: String,
        required: true,
        unique:true
    },
    taskdescription: {
        type: String,
        required:true,
        unique:true
    },
    status:{
        type:String
        
    }
   
});

const Tasks = new mongoose.model("tasks",taskSchema);


export default Tasks;