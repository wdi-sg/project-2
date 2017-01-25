var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ServiceSchema = new mongoose.Schema({
  ServiceNo:  {type: String, unique:true}
});

module.exports = mongoose.model('Bus', ServiceSchema);
