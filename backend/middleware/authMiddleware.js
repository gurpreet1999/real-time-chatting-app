const jwt = require("jsonwebtoken");
const USER = require("../models/userModel");
const errorHandler = require("../utils/errorHandler");

const protect = async (req, res, next) => {
  try {
  console.log("he")
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
       let  token = req.headers.authorization.split(" ")[1];
       console.log(token)
       
        if(!token){
            return next(new errorHandler("token expire", 400));
        }

 const jwtDecode = await jwt.verify(token, "abcde");
 console.log(jwtDecode)
      let user = await USER.findById(jwtDecode.id)
      console.log(user)
      req.user=user
       next();

    }
  } catch (err) {
    return next(new errorHandler("invalid token  ", 400));
  }
};

module.exports = protect;

