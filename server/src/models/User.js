const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Can't be blank"],
    },
    email: {
      type: String,
      lowercase: true,
      index: true,
      unique: true,
      required: [true, "Can't be blank"],
      validate: [isEmail, "invalid email"],
    },
    password: {
      type: String,
      required: [true, "Can't be blank"],
    },
    newMessage: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
      default: "online",
    },
  },
  { minimize: false }
);

const User = model("User", UserSchema);
module.exports = User;
