// models
const SearchList = require('../models/searchList');
const AnalyzedList = require('../models/analyzedList');

var saveResult = function(displayArray, itemArray, displaySortedArray) {
  displayArray.forEach(function(element) {
    SearchList.create({
      item: element.indivItem,
      result: element.indivResult
    });
  });

  AnalyzedList.create({
    item: itemArray.join(", ").toUpperCase(),
    result: displaySortedArray
  });
};

module.exports = saveResult;
