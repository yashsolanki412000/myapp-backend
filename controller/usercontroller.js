var db = require("../modules")

    const {Sequelize,Op}  = require("sequelize")
    const User = db.users;
    var adduser = async (req,resp) => {
    //     let data = User.create({name:"yash",email:"yash@gmail.com"})
    //    let response = {
    //     data:"ok"
    //    }
    //    resp.status(200).json(response)
    }
    var crudoperation = async (req,res) => {
        // // insert
        // // let data = User.create({name:"yash",email:"yash123@gmail.com"})
        // let data = await User.update({name:"parth"},{
        //     where:{
        //         id:4
        //     }
        // })
        // // delete
        // // let data = await User.destroy({
        // //     where:{
        // //         id:3
        // //     }
        // // })
    }

    var queries = async (req,res) => {
        //  let data = User.create({name:"yash",email:"yash123@gmail.com",gender:"male"},{
        //     fields:["gender"]
        //  })
        //  let response = {
        //         data:"ok"
        //        }
        //        res.status(200).json(response)
        //select
        // let data = await User.findAll({
        //     attributes:["name",["email","emailID"],[Sequelize.fn("Count",Sequelize.col("email")),"emailCount"]]
        // })
        //     let response = {
        //         data : data
        //     }
        //     res.status(200).json(response)

        // exclude and include

        // let data = await User.findAll({
        //     attributes:{exclude:["email"],
        //     include:[
        //         [Sequelize.fn("CONCAT",Sequelize.col("name"),"Solanki"),"fullname"]
        //     ]
        // }
        // })
        // let response = {
        //     data:data
        // }
        // res.status(200).json(response)


        //........conditions..........//

    }
        
         var validation = async (req,res) => {
            let data = await User.findAll({})

            let response = {
                data : data
            }
            res.status(200).json(response)
         }
         
    
    module.exports = {
        adduser,
        crudoperation,
        queries,
        validation
    }