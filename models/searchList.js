const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchListSchema = new Schema({
  item: {
    type: String
  },
  result: {
    type: Array
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const SearchList = mongoose.model('SearchList', searchListSchema);
module.exports = SearchList;
