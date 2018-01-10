const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analyzedListSchema = new Schema({
  item: {
    type: Array
  },
  result: {
    type: Array
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const AnalyzedList = mongoose.model('AnalyzedList', analyzedListSchema);
module.exports = AnalyzedList;
