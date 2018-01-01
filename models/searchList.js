const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchListSchema = new Schema({
  item: {
    type: String
  },
  result: {
    type: Array
  }
});

const SearchList = mongoose.model('SearchList', searchListSchema);
module.exports = SearchList;
