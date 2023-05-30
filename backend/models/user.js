import express from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique:true,
        required: true,
       
    },
    password: {
        type: String,
        required:true,
        unique:true
    }
   
});

const Userinfo = new mongoose.model("userinfo",userSchema);


export default Userinfo;