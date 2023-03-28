const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    pic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  let password = this.password;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  this.password = hashedPassword;
});

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const USER = mongoose.model("USER", userModel);
module.exports = USER;
