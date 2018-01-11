const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  email: {
    type: String,
  },
  password: String,
  profilePic: String
});


module.exports = mongoose.model('User', UserSchema);
