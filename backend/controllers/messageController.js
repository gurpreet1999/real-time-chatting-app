const CHAT = require("../models/chatModel")
const MESSAGE = require("../models/messageModel")
const errorHandler = require("../utils/errorHandler")



const sendMessage=async(req,res,next)=>{

    try{
        const {content,chatId}=req.body
        if(!content || !chatId){
            return next(new errorHandler("ok"))
        }
        
        var message={
        sender:req.user._id,
        content:content,
        chat:chatId
        }

    
var message=await MESSAGE.create(message)


message=await message.populate("sender","name pic")
message=await message.populate('chat')
message=await message.populate('chat.users',"name pic email")

// message=await USER.populate(message,{
//     path:"chat.user",
//     select:"name email pic"
// })

console.log(message)
await CHAT.findByIdAndUpdate(req.body.chatId,{
    latestMessage:message
})

res.json({message})


    }
    catch(err){
        return next(new errorHandler("server error"))
    }




}


const allMessage=async(req,res,next)=>{

try{
console.log(req.params.chatId)
  const  allmessage=await MESSAGE.find({chat:req.params.chatId}).populate('sender' ,"name email pic").populate("chat")
return res.status(201).json({
    allmessage:allmessage
})
}
catch(err){
console.log(err)
}



}


module.exports={allMessage,sendMessage}