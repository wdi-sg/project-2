var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var StopSchema = new mongoose.Schema({
  BusStopID:  {type: String, unique: true},
  RoadName: {type: String},
  Description: {type: String},
  Latitude: {type: String},
  Longitude: {type: String},
  BusServices: {type: Array}
});

// RouteSchema.pre('save', function(next) {
//
//   // check if the route number exists with the database
//
//    next();
// });

module.exports = mongoose.model('Stop', StopSchema);
