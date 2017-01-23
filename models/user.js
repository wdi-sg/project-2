const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const UserSchema = new mongoose.Schema({
  name : {
    type : String,
    minlength : [3,'Name must be between 3 and 99 characters!'],
    maxlength : [99,'Name must be between 3 and 99 characters!']
  },
  email : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    match : emailRegex
  },
  password : {
    type : String,
    required : true,
    minlength : [5,'Password must be between 5 and 99 characters'],
    maxlength : [99,'Password must be between 5 and 99 characters']
  }
});

UserSchema.pre('save',function(next){
  if (!this.isModified('password')) return next();
  var hash = bcrypt.hashSync(this.password,10);
  this.password = hash;
  next();
})

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password,this.password);
}

//this should be called only during testing...
UserSchema.options.toJSON = {
  transform : function(doc,ret,options){
    delete ret.password;
  }
}

//schema looks fine..
// console.log(UserSchema);

module.exports = mongoose.model('User',UserSchema);
