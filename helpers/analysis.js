const List = require('../models/list');
var searchField = ["restaurant", "pen"];
var query = {indivItem: {$in: searchField}};

var analyzeResult = function() {
  List.find(query, (err, list) => {
    if (err) console.log(err);
    // console.log(typeof list[0]);
    // console.log(typeof list[1]);

    list[0].indivResult.forEach(function(element0) {
      list[1].indivResult.forEach(function(element1) {
        if (Math.abs(element0.latitude - element1.latitude) < 0.004 && Math.abs(element0.longitude - element1.longitude) < 0.004) {
          console.log(element0.name + "-" + element1.name);
        }
      });
    });
  });
};

module.exports = analyzeResult;
