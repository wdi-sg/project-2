const yelp = require('yelp-fusion');
const dbConfig = require('../config/dbConfig');
const apiKey = dbConfig.apiKey;
const client = yelp.client(apiKey);

// const List = require('../models/list');
// const search = require('../helpers/search');
const analyzeResult = require('../helpers/analysis');
var displayedArray = [];

// home page
exports.home = (req, res) => {
  res.render('home');
};

// search result for individual fields
exports.search = (req, res) => {
  var itemArray = [];
  var displayArray = [];
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
    location = response.jsonBody.businesses[0].location.address1 + ", " + response.jsonBody.businesses[0].location.country;
    console.log(location);
  }).then(() => {

    // search API
    itemArray.forEach(function(element) {
      client.search({
        location: location,
        limit: 8,
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
            longitude: business.coordinates.longitude,
            address1: business.location.address1,
            address2: business.location.address2,
            link: business.url
          });
        });
        displayArray.push({
          indivItem: element.toUpperCase(),
          indivResult: resultArray
        });
      }).then(() => {

        // callback function, asynchronous problem addressed by if statement
        console.log("2");
        // console.log(displayArray);
        if (displayArray.length === itemArray.length) {
          displayedArray = displayArray;
          displayResults(displayArray);
          displayArray = [];
        }
      }).catch(e => {
        console.log(e);
      });
    });
  });
};

// smart search for entire list
exports.analyze = (req, res) => {
  var displayAnalyzeArray = analyzeResult(displayedArray);
  res.render('analyze', {'list': displayAnalyzeArray});
};
