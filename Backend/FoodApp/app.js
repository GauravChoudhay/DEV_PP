const express = require("express");


const app = express();

app.use(express.json());

app.get("/", function(req,res){
    console.log("hello from home page");
    res.send("<h1>Hello from Backend</h1>");
} )

let user = {
    
}

app.post("/user",function(req,res){
    console.log("req.data",req.body);
    user = req.body;
    res.status(200).send("data revieved and user added");

} )

//get
app.get("/user",function(req,res){
    console.log("users");
    res.json(user);

} )


app.listen(8080,function(){
    console.log("server started");
} )