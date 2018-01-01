const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analyzedListSchema = new Schema({
  item: {
    type: Array
  },
  result: {
    type: Array
  }
});

const AnalyzedList = mongoose.model('AnalyzedList', analyzedListSchema);
module.exports = AnalyzedList;
