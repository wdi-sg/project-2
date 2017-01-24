var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ServiceSchema = new mongoose.Schema({
  ServiceNo:  {type: String, unique:true}
});

// RouteSchema.pre('save', function(next) {
//
//   // check if the route number exists with the database
//
//    next();
// });

module.exports = mongoose.model('Bus', ServiceSchema);
