// API
const yelp = require('yelp-fusion');
const dbConfig = require('../config/dbConfig');
const apiKey = dbConfig.apiKey;
const client = yelp.client(apiKey);

const sortResult = require('../helpers/analysis');

// models
const SearchList = require('../models/searchList');
const AnalyzedList = require('../models/analyzedList');


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

  // function to render search results page
  var displayResults = function(displayArray, itemArray, displaySortedArray) {
    res.render('result', {'searchList': displayArray, 'search': itemArray.join(", ").toUpperCase(), 'analyzedList': displaySortedArray});
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

        // callback function, asynchronous problem addressed by promise and checking with if statement
        console.log("2");
        if (displayArray.length === itemArray.length) {
          var displaySortedArray = sortResult(displayArray);
          // console.log(itemArray);
          // console.log(displaySortedArray);
          displayResults(displayArray, itemArray, displaySortedArray);
        }
      }).catch(e => {
        console.log(e);
      });
    });
  });
};


// save and analyze results
exports.save = (req, res) => {
  // save results to database
  displayedArray.forEach(function(element) {
    SearchList.create({
      item: element.indivItem,
      result: element.indivResult
    });
  });

  // analyze results
  var displaySortedArray = sortResult(displayedArray);

  AnalyzedList.create({
    item: itemArray.join(", ").toUpperCase(),
    result: displaySortedArray
  });
  res.render('analyze', {'search': itemArray.join(", ").toUpperCase(), 'list': displaySortedArray});
};
