import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import body_parser from "body-parser";
import dotenv from "dotenv";
import Userinfo from "./models/user.js";
import Tasks from "./models/task.js";
import middleware from "./middleware/index.js";
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(body_parser.json());
dotenv.config();
//routes
//1. once registered user details are saved to mongodb
app.post("/userdetails",async(req,res)=>{
    const username=req.body.name;
    const password=req.body.password;
    

const userdetails = new Userinfo({
    username:username,
    password:password
})
try{
await userdetails.save();
res.send("data inserted to mongodb");
res.render("/login");
}
catch(err){
    console.log(err);
}
});
//2.once we click on login it will check the details entered are matching with saved details
//if matching it will display the tasks page else error message to enter correct details
app.post("/login",async(req,res)=>{
    const username=req.body.name;
    const password=req.body.password;
    const name= await Userinfo.findOne({username:username});
    const pwd= await Userinfo.findOne({password:password});

    if(name && pwd){
       res.json("exist");
    }
   
    else{
        res.json("please register to login");
    }

});

app.post("/addtask",async(req,res)=>{
    const { title,description}=req.body;
    
const taskdetails = new Tasks({
    taskname:title,
    taskdescription:description,
    
})
try{
await taskdetails.save();
res.json("added");
res.send("Task details inserted in  to mongodb");

}
catch(err){
    console.log(err);
}
});
app.get("/users",async(req,res)=>{
    try {
        const users = await Userinfo.find();
        res.status(201).json(users)
        
    } catch (error) {
        res.status(422).json(error);
    }
})
app.delete("/deleteAll",async(req,res)=>{
    try {
        const deletealltasks = await Tasks.deleteMany();
        res.status(201).json(users)
        
    } catch (error) {
        res.status(422).json(error);
    }
})

app.get("/tasks",async(req,res)=>{
    try {
        const users = await Tasks.find();
        res.status(201).json(users)
        
    } catch (error) {
        res.status(422).json(error);
    }
})

app.get("/gettasks/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const taskindividual = await Tasks.findById({_id:id});
        console.log(taskindividual);
        res.status(201).json(taskindividual)

    } catch (error) {
        res.status(422).json(error);
    }
});

app.delete("/deletetask/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletetask = await Tasks.findByIdAndDelete({_id:id})
        console.log(deletetask);
        res.status(201).json(deletetask);

    } catch (error) {
        res.status(422).json(error);
    }
});


app.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updatedtask = await Tasks.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updatedtask);
        res.status(201).json(updatedtask);

    } catch (error) {
        res.status(422).json(error);
    }
})



//Mongodb connection
const DB = process.env.MONGO_URI


mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
}).then(()=> console.log("Database connected"))
.catch((error)=> console.log(error.message));


//localhost connection
const port=process.env.port
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})