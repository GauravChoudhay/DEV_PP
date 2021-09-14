// npm init -y
// npm i express
// npm i nodemon -g  ( and then go to package.json and add "start" : "nodemon app.js" to script object)


const express = require("express");


const app = express();

app.use(express.json());
app.use(express.static('public'));// jab bhi public mai index.html hoti hai to wo as "/" pr load hota hai automatically

app.get("/", function(req,res){
    console.log("hello from home page");
    res.send("<h1>Hello from Backend</h1>");
} )

//database
let user = [];

function signupUser(req, res) {
    //email,user name ,password
    let { email, password, name } = req.body;
    console.log("user", req.body);
    user.push({
        email, name, password
    })
    res.status(200).json({
        message: "user created",
        createdUser: req.body
    })
}

function loginUser(req,res){

}


// mounting in express 
const userRouter = express.Router();
const authRouter = express.Router();
// /api/user/:id
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

userRouter
    .route("/")
    .get(getUser)
    .post(createUser)
    .patch(updateUser)
    .delete(deletUser);
userRouter
    .route("/:id")
    .get(getUserById);
authRouter
.post("/signup",setCreatedAt,signupUser)
.post("/login",loginUser)


function setCreatedAt(req,res,next){
    req.body.createdAt = new Date().toISOString();
    next();
}

function createUser(req, res) {
    console.log("req.data", req.body);
    user = req.body;
    res.status(200).send("data recieved and user added ");
}
function getUser(req, res) {
    console.log("users")
    res.json(user);
    // for sending key value pair
}
function updateUser(req, res) {
    let obj = req.body;
    for (let key in obj) {
        user[key] = obj[key];
    }
    res.status(200).json(user);
}
function deletUser(req, res) {
    user = {}
    res.status(200).json(user);
}
function getUserById(req, res) {
    console.log(req.params);
    res.status(200).send("Hello");
}

// app.post("/api/user", createUser);
// // get
// app.get("/api/user", getUser);
// //update
// app.patch("/api/user", updateUser);
// //delete
// app.delete("/api/user", deletUser);
//template routes 
// app.get("api/user/:id", getUserById);



app.listen(8080,function(){
    console.log("server started");
} )