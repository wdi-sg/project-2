// models
const SearchList = require('../models/searchList');
const AnalyzedList = require('../models/analyzedList');

// create results into database, searchList and analyzedList
var saveResult = function(displayArray, itemArray, displaySortedArray, userId) {
  displayArray.forEach(function(element) {
    SearchList.create({
      item: element.indivItem,
      result: element.indivResult,
      username: userId
    });
  });

  AnalyzedList.create({
    item: itemArray.join(", ").toUpperCase(),
    result: displaySortedArray,
    username: userId
  });
};

module.exports = saveResult;
