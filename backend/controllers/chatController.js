const CHAT = require("../models/chatModel");
const USER = require("../models/userModel");

//this route is responsible for creating or fetching a one on one chat
const accessChat = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    res.send("sorry");
  }

 
  var isChat = await CHAT.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage")
    .populate({ path: "latestMessage", populate: { path: "sender" } });

  // inside the messageModel we have sender field ..woh vi ek id he ..so usko vi populate krna hoga
  //i am gonna populate the user inside of this latest message
  // --this is the thing we are looking to populate inside the given path
  // isChat = await USER.populate(isChat, {
  //     path: "latestMessage.sender",
  //     select: "name pic email",
  //   });

  

  if (isChat.length > 0) {
    return res.send(isChat);
  } else {
    var chat = {
      chatName: "sender",
      isGroupChat: false,
      users:[req.user._id, userId],
    };

    const createdChat = await CHAT.create(chat);
    const fullChat = await CHAT.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );

    res.send(fullChat);
  }
};

const fetchChats = async (req,res,next) => {

  console.log("hii")
  CHAT.find({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (result) => {
      // and sort all array according from new to old chat
      const results = await USER.populate(result, {
        path: "latestMessage.sender",
        select: "name pic email",
      });
      return res.status(200).send(result);
    });
};

const createGroupChat = async (req,res,next) => {
  
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "please fill all the feilds" });
  }
  var users=JSON.parse(req.body.users) 
 

  if (users.length < 2) {
    return res.status(400).send("more than 2 user are requred to form a group");
  }

  
  users.push(req.user._id);
 

  const groupChat = await CHAT.create({
    chatName: req.body.name,
    users: users,
    isGroupChat: true,
    groupAdmin: req.user,
  });

  //after creating

  const fullGroupChat = await CHAT.findOne({ _id: groupChat._id })
    .populate("users", "-password")
    .populate("admin", "-password");

  res.status(200).json(fullGroupChat);
};

const renameGroup = async (req, res) => {
  const { chatName, chatId } = req.body;
  const updatedChat = await CHAT.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("admin", "-password");
};

const addToGroup = async () => {
  const { chatId, userId } = req.body;

  const addedMember = await CHAT.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("admin", "-password");
};

const removeFromGroup = async (req, res, next) => {
  const { chatId, userId } = req.body;

  const remove = await CHAT.findByIdAndUpdate(
    userId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("admin", "-password");
};

module.exports = {
  accessChat,
  addToGroup,
  fetchChats,
  renameGroup,
  removeFromGroup,
  createGroupChat
};
