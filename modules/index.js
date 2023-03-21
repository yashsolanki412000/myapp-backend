const {Sequelize,DataTypes} = require("sequelize");

const sequelize = new Sequelize("crudmysql","root","",{
    host:"localhost",
    dialect:"mysql",
})

sequelize.authenticate()
.then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log(err)
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({force:false})
.then(()=>{
    console.log("yes")
})
db.users = require("./users")(sequelize,DataTypes)
module.exports = db