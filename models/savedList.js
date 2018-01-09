const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedListSchema = new Schema({
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

const SavedList = mongoose.model('SavedList', savedListSchema);
module.exports = SavedList;
