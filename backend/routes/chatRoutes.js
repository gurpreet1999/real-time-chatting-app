const express=require('express')
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require('../controllers/chatController')
const protect = require('../middleware/authMiddleware')



const chatRouter=express.Router()

chatRouter.post('/',protect,accessChat)//access all chats
chatRouter.get('/',protect,fetchChats)
chatRouter.post('/creategroup',protect,createGroupChat)//create group chat
chatRouter.put('/group/rename',protect,renameGroup)//to rename group chat
chatRouter.put('/group/removeuser',protect,removeFromGroup)//to remove user from group
chatRouter.put('/group/adduser',protect,addToGroup)//to add user in a group



module.exports=chatRouter


