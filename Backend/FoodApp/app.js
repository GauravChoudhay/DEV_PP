// npm init -y
// npm i express
// npm i nodemon -g  ( and then go to package.json and add "start" : "nodemon app.js" to script object)


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

//update
app.patch("/user", function (req, res) {
    let obj = req.body;
    for (let key in obj) {
        user[key] = obj[key];
    }
    res.status(200).json(user);
})
//delete
app.delete("/user", function (req, res) {
    user = {}
    res.status(200).json(user);
})

//template routes 
app.get("/user/:id", function (req, res) {
    console.log(req.params);
    res.status(200).send("Hello");
})



app.listen(8080,function(){
    console.log("server started");
} )