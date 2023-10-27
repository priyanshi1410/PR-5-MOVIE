const express = require('express');
const connect = require('./config/db');
const router = require('./Routes/user.route');
const app = express();
app.use(express.json());
app.use(router)


app.get("/" , (req , res) =>{
    res.send("Welcome to the movie API")
})

app.listen(8090 , ()=>{
    console.log("start listening in port 8090");
    connect();
})