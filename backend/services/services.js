const usermodel = require("../models/user.models")



module.exports.createuser = async ({
    firstname, lastname, email, password
})=>{
    if(!firstname || !lastname || !email || !password){
        throw new Error('all fields are required bhai')
    }

    const user = usermodel.create({
        fullname : {
            firstname ,
            lastname
        },
        email,
        password
    })
 return user
}

