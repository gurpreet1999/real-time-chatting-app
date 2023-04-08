const generateToken = require("../config/generateToken");
const USER = require("../models/userModel");
const errorHandler = require("../utils/errorHandler");

const registerUser = async (req, res, next) => {
  try {
    let { name, email, password, pic } = req.body;
    



    if ((!name, !email, !password)) {
      return next(new errorHandler("please add all the filed ", 400));
    }

    

    const userExist = await USER.findOne({ email: email });
    if (userExist) {
      return next(new errorHandler("user already exist with this email ", 400));
    }




    const createdUser = await USER.create({
      name,
      email,
      password,
      pic,
    });

 

    res.status(201).json({
      id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      pic: createdUser.pic,
      message: "registration successfully",
      sucsess: true,
      token: generateToken(createdUser._id),
    });


  } catch (err) {
    console.log(err)
    return next(new errorHandler());
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  
    if ((!email, !password)) {
      return next(new errorHandler("pls add all the field ", 400));
    }

    const user = await USER.findOne({ email: email });
    
    if (!user) {
      return next(new errorHandler("invalid email or password ", 400));
    }

    let match = await user.matchPassword(password);

    if (!match) {
      return next(new errorHandler("invalid email or password  ", 400));
    }

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      message: "logged In Successfully",

      sucsess: true,
      token: generateToken(user._id),
    });
  } catch (err) {
    return next(new errorHandler());
  }
};

const getAllUser = async (req, res, next) => {
  try {
    let keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const allUser = await USER.find(keyword)
      .find({ _id: { $ne: req.user._id } })
      .select("-password");
    res.status(201).json({
      user: allUser,
    });
  } catch (err) {
    return next(new errorHandler("Internal Server Error"));
  }
};

module.exports = { registerUser, getAllUser, loginUser };
