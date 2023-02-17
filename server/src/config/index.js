const dotenv = require('dotenv').config()

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  salt: Number(process.env.SALT),
}


