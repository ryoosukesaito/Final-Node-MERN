const User = require('../models/User');

const signupController = async (req,res) => {
  try {
    const {name, email, password} = req.body;
    console.log(req.body);
    const user = await User.create({name, email, password})
    res.state(200).json(user);
  } catch (error) {
    let msg;
    if(error.code === 11000) {
      msg = 'Email already exists'
    }else {
      msg = error.message
    }
    console.log(error)
    res.status(400).json(msg)
  }
}

const loginController = async (req,res) => {
  try {
    const {name, password} = req.body;
    const user = await User.findByCredentials({name, password})
    user.status = 'online';
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    
  }
}



module.exports = {
  signupController,
  loginController
}