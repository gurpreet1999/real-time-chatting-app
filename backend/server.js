require('dotenv').config()
const express=require('express')
const databaseConnection = require('./config/databaseConfig')
const Errormiddleware = require('./middleware/errorMiddleware')
const chatRouter = require('./routes/chatRoutes')
const messageRouter = require('./routes/messageRoutes')
const userRouter = require('./routes/userRoutes')
var cors = require('cors')

const app=express()
databaseConnection()

app.use(cors())
app.use(express.json())


app.use('/v1/user',userRouter)
app.use('/v1/chat',chatRouter)
app.use('/v1/message',messageRouter)

app.use(Errormiddleware) //sabse last me use krna he error middleware ko

const server=app.listen(4000,()=>{
    console.log("server is running fine")
})





const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    console.log(userData)
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("newMessage", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
  
    if (!chat.users){
     console.log("chat.users not defined");
     return;
    } 
let room;
    chat.users.forEach((user) => {
      if (user._id !== newMessageRecieved.sender._id) {

       room=user._id
      }
    
     
    });
  io.emit("newMessage", newMessageRecieved);
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
})