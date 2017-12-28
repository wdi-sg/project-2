const yelp = require('yelp-fusion');
const dbConfig = require('../config/dbConfig');
const apiKey = dbConfig.apiKey;
const client = yelp.client(apiKey);

const List = require('../models/list');
// const searchResult = require('../helpers/search');
const analyzeResult = require('../helpers/analysis');

// home page
exports.home = (req, res) => {
  res.render('home');
};

// search result for individual fields
exports.search = (req, res) => {
  var itemArray = [];
  var resultArray = [];
  var displayArray = [];
  for (var index = 0; index < 2; index++) {
    itemArray.push(req.body["entry" + index]);
  }

  var displayResults = function(array) {
    res.render('result', {'list': array});
  };

  itemArray.forEach(function(element) {
    client.search({
      location: 'Singapore',
      limit: 5,
      term: element
    }).then(response => {
      var result = response.jsonBody.businesses;
      console.log("1");
      // console.log(result);
      result.forEach(function(business) {
        resultArray.push({
          name: business.name,
          latitude: business.coordinates.latitude,
          longitude: business.coordinates.longitude
        });
      });
      // console.log(resultArray);
      displayArray.push({
        indivItem: element,
        indivResult: resultArray
      });
      resultArray = [];
    }).then(() => {
      console.log("2");
      // console.log(displayArray);
      if (displayArray.length === itemArray.length) {
        displayResults(displayArray);
      }
    }).catch(e => {
      console.log(e);
    });
  });




  // var searchArray = [];
  // for (var index = 0; index < 2; index++) {
  //   searchArray.push(req.body["entry" + index]);
  // }
  // searchResult(req, res);
  //
  // setTimeout(function() {
  //   List.find({indivItem: {$in: searchArray}}, (err, list) => {
  //     if (err) console.log(err);
  //     var convertList = [];
  //     list.forEach(function(item) {
  //       convertList.push({
  //         indivItem: item.indivItem
  //       });
  //     });
  //     // console.log("1");
  //     console.log(convertList);
  //     console.log(typeof convertList[0]);
  //     console.log(typeof convertList[2]);
  //     if (convertList[0] == convertList[2]) {
  //       console.log("same");
  //     } else {
  //       console.log("no");
  //     }
  //     var filteredList = convertList.filter(function(item, pos) {
  //       // console.log(item);
  //       // console.log(pos);
  //       return convertList.indexOf(item) == pos;
  //     });
  //     // console.log("2");
  //     // console.log(filteredList);
  //     res.render('result', {'list': filteredList});
  //   });
  // }, 4000);
};

// display results
exports.result = (req, res) => {
  var array = ["restaurant", "pen"];
  var objectResult = {};
  for (var index = 0; index < 2; index++) {
    console.log(array[index]);
    List.findOne({indivItem: array[index]}, (err, list) => {
      if (err) console.log(err);
      objectResult["list" + index] = list;
      console.log(objectResult);
    });
  }
  console.log(objectResult);
  setTimeout(function() {
    console.log("2");
    res.render('result', objectResult);
  }, 2000);

};

// smart search for entire list
exports.smartSearch = (req, res) => {
  analyzeResult();
};
