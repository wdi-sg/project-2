const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  indivItem: {
    type: String
  },
  indivResult: {
    type: Array
  }
});

const List = mongoose.model('List', listSchema);
module.exports = List;
