const yelp = require('yelp-fusion');
const dbConfig = require('../config/dbConfig');
const apiKey = dbConfig.apiKey;
const client = yelp.client(apiKey);

// const List = require('../models/list');
// const search = require('../helpers/search');
const analyzeResult = require('../helpers/analysis');
var displayArray = [];

// home page
exports.home = (req, res) => {
  res.render('home');
};

// search result for individual fields
exports.search = (req, res) => {
  var itemArray = [];
  var location = 'Singapore';
  var inputField = Object.keys(req.body).length - 1;

  // get input data
  for (var index = 0; index < inputField; index++) {
    itemArray.push(req.body["entry" + index]);
  }

  var displayResults = function(array) {
    res.render('result', {'list': array});
  };

  client.search({
    location: location,
    limit: 5,
    term: req.body.entry0
  }).then(response => {
    // search to get rough location
    location = response.jsonBody.businesses[0].location.address1;
  }).then(() => {

    // search API
    itemArray.forEach(function(element) {
      client.search({
        location: location,
        limit: 5,
        term: element
      }).then(response => {

        // push to array
        var result = response.jsonBody.businesses;
        var resultArray = [];
        console.log("1");
        // console.log(result);
        result.forEach(function(business) {
          resultArray.push({
            name: business.name,
            latitude: business.coordinates.latitude,
            longitude: business.coordinates.longitude
          });
        });
        displayArray.push({
          indivItem: element,
          indivResult: resultArray
        });
      }).then(() => {

        // callback function, asynchronous problem addressed by if statement
        console.log("2");
        // console.log(displayArray);
        if (displayArray.length === itemArray.length) {
          displayResults(displayArray);
        }
      }).catch(e => {
        console.log(e);
      });
    });
  });
};

// smart search for entire list
exports.analyze = (req, res) => {
  var analyzeArray = [];
  var displayAnalyzeArray = [];
  for (var index = 0; index < displayArray.length; index++) {
    displayArray[index].indivResult.forEach(function(i) {
      // console.log("test1");
      if (index + 1 < displayArray.length) {
        displayArray[index + 1].indivResult.forEach(function(j) {
          // console.log("test2");
          // var analyzeString = analyzeResult(i, j);
          if (analyzeResult(i, j)) {
            analyzeArray.forEach(function(element) {
              var res = element.result.name.split("-");
              if (i.name === res[res.length - 1]) {
                console.log(i.name);
                analyzeArray.push({
                  result: {
                    name: element.result.name + "-" + j.name
                  }
                });
              }
            });
            analyzeArray.push({
              result: {
                name: i.name + "-" + j.name
              }
            });
          }
        });
      }
    });
  }

  // check for elements which are present for all search fields
  // console.log(analyzeArray);
  analyzeArray.forEach(function(element) {
    var res = element.result.name.split("-");
    if (res.length === displayArray.length) {
      console.log(element);
      displayAnalyzeArray.push(element);
    }
  });
  res.render('analyze', {'list': displayAnalyzeArray});
};
