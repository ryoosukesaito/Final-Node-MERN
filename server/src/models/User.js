const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");
const { Schema, model } = mongoose;

const {salt} = require('../config')

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

UserSchema.pre("save", async function(next){
  if(!this.isModified("password"))return next();
  const hash = await bcrypt.hash(this.password, salt)
  this.password = hash;
  next();
})


//delete user original password
UserSchema.methods.toJSON = function(){
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

//validating user Email and password
UserSchema.statics.findByCredentials = async function( email, password){
  const user = await User.findOne({email})
  if(!user) throw new Error('Email or Password does not match');
  const isValid = await bcrypt.compare(password, user.password);
  if(!isValid) throw new Error('Password does not match');

  return user;
}

const User = model("User", UserSchema);
module.exports = User;
