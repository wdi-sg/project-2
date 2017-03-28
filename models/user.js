const mongoose = require('mongoose')
const bcrypt   = require('bcrypt');
const Classroom = require('../models/classroom').schema
const School = require('../models/school').schema

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;


const userSchema = new mongoose.Schema({
  role: { type: String },
  name:  {
    type: String,
    minlength: [3, 'Name must be between 3 and 99 characters'],
    maxlength: [99, 'Name must be between 3 and 99 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: emailRegex
  },
  password: {
    type: String,
    required: true ,
    minlength: [8, 'Password must be between 8 and 99 characters'],
    maxlength: [99, 'Password must be between 8 and 99 characters'],
  },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "School"},
});

userSchema.pre('save', function(next) {
   var user = this;

   // Only hash the password if it has been modified (or is new)
   if (!user.isModified('password')) return next();

   //hash the password
   var hash = bcrypt.hashSync(user.password, 10);

   // Override the cleartext password with the hashed one
   user.password = hash;
   next();
});

userSchema.methods.validPassword = function(password) {
  // Compare is a bcrypt method that will return a boolean,
  return bcrypt.compareSync(password, this.password);
};

userSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        // delete the password from the JSON data, and return
        delete ret.password;
        return ret;
    }
}

const User = mongoose.model('User', userSchema)

module.exports = {
  model: User,
  schema: userSchema
}
