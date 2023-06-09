const express=require('express')
const { registerUser, loginUser, getAllUser } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')



const userRouter=express.Router()


userRouter.post('/',registerUser)

userRouter.post('/login',loginUser)
userRouter.get('/alluser',protect,getAllUser)


module.exports=userRouter