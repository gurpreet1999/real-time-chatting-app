const jwt=require('jsonwebtoken')

const generateToken=(id)=>{
    return jwt.sign({id},"abcde",{
        expiresIn:'30d'
    })
}

module.exports=generateToken