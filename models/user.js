const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 13;


const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please type in your name']
  },
  email: {
    type: String,
    required: [true, 'Please type in your email']
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function(next) {
	let user = this;
	console.log("userSchema.pre('save\…)");
	console.log(user.password);
	console.log('New account (?):')
	console.log(user.isModified('password'));

  if (!user.isModified('password')) return next();

    // Generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // Hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // Override the plain text password with the hashed one
            user.password = hash;
            next();
        });
    });
});


userSchema.methods.validPassword = function(password){
  let user = this
  return bcrypt.compareSync(password,user.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User
