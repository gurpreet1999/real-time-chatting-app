const express=require('express')
const protect = require('../middleware/authMiddleware')
const {sendMessage, allMessage}=require('../controllers/messageController.js')

const messageRouter=express.Router()


messageRouter.post('/',protect,sendMessage)
messageRouter.get('/:chatId',protect,allMessage)



module.exports=messageRouter