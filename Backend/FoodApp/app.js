const express = require("express");


const app = express();

app.get("/", function(req,res){
    console.log("hello from home page");
    res.send("<h1>Hello from Backend</h1>");
} )

let obj = {
    name : "gaurav",
    age: "21"
}

app.get("/user",function(req,res){
    console.log("user");
    res.json(obj);
} )


app.listen(8080,function(){
    console.log("server started");
} )