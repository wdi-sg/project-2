var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RouteSchema = new mongoose.Schema({
  ServiceNo:  {type: String},
  BusStopID: {type: Array},
  user_id: {type: Schema.Types.ObjectId, ref: 'User'}
});

RouteSchema.pre('save', function(next) {

  // check if the route number exists with the database

   next();
});

module.exports = mongoose.model('Route', RouteSchema);
