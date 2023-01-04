const mysql = require("mysql")

const conn = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"mydata"
})
conn.connect((err)=>{
    if(err) throw err
    console.log("DB")
})
module.exports = conn