const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

let userSchema = new mongoose.Schema({
  name:{
    type: String,
    require: true,
    minlength: [6, 'Name should be between 6 to 20 characters.'],
    maxlength: [20, 'Name should be between 6 to 20 characters.']
  },
  email:{
    type: String,
    require: true,
    
  },
  password:{
    type: String,
    require: true,
    minlength: [6, 'Password should be between 6 to 10 characters.'],
    maxlength: [10, 'Password should be between 6 to 10 characters.']
  }
})
