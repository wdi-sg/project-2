// models
const SearchList = require('../models/searchList');
const AnalyzedList = require('../models/analyzedList');

// create results into databases, searchList and analyzedList
exports.saveResultAll = function(itemArray, displaySortedArray, userId) {
  // displayArray.forEach(function(element) {
  //   SearchList.create({
  //     item: element.indivItem,
  //     result: element.indivResult,
  //     username: userId
  //   });
  // });

  AnalyzedList.create({
    item: itemArray.join(", ").toUpperCase(),
    result: displaySortedArray,
    username: userId
  });
};

// create results into database, searchList only
// exports.saveResult = function(displayArray, userId) {
//   displayArray.forEach(function(element) {
//     SearchList.create({
//       item: element.indivItem,
//       result: element.indivResult,
//       username: userId
//     });
//   });
// };
