
module.exports = (sequelize,DataTypes) => {
    const Users = sequelize.define("userdata",{
        name : DataTypes.STRING,
        email:{
            type:DataTypes.STRING,
        },
        gender:{
            type:DataTypes.STRING
        },
    },  
    )
    return Users
}