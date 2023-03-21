const express = require("express")
const app = express();
var mysql = require("mysql2")
require("./modules/index")

const port = 8080;

var userctr = require("./controller/usercontroller")

app.get("/",function(res,resp){
    resp.send("home page")
})

app.get("/add",userctr.adduser);
app.get("/crud",userctr.crudoperation)
app.get("/query",userctr.queries)
app.get("/valid",userctr.validation)

app.listen(port,()=>{
    console.log(`server starting ${port}`)
})
