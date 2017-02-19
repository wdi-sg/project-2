const mongoose = require('mongoose');
const ratingSchema = require('./rating');

const ProfileSchema = new mongoose.Schema({
  description : {
    type : String,
    maxlength : [99, 'description cannot be more than 99 characters!!'],
    required : true
  },
  avatar : Buffer,
  ratings : [ratingSchema],
  user : { type : mongoose.Schema.Types.ObjectId, ref:'User'}
})

const Profile = module.exports = mongoose.model('Profile', ProfileSchema);

// var test  = new Profile({
//   description : 'this is a describ',
//   ratings : [
//     {
//       rating : 5
//      //whoCreated : ...
//     },{
//       rating : 4
//     }]
// })
//
// console.log(test);
