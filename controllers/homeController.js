// dependencies
require('dotenv').config();
const asyncP = require('async-promises');

// API
const yelp = require('yelp-fusion');
const apiKey = process.env.API_KEY;
const client = yelp.client(apiKey);

// external functions
const analysis = require('../helpers/analysis');
const saveData = require('../helpers/save');


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

  // asynchronous approach
  return asyncP.each(itemArray, (entry) => {
    // console.log(itemArray);
    return new Promise((resolve) => {
      console.log("1");
      client.search({
        location: location,
        limit: 8,
        term: entry
      }).then(response => {
        // push results to array
        var result = response.jsonBody.businesses;
        var resultArray = [];
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
          indivItem: entry.toUpperCase(),
          indivResult: resultArray
        });
        // console.log(resultArray);
        resolve();
      });
    });
  }).then(() => {
    // waiting for results and checking with if statement
    console.log("2");
    if (displayArray.length === itemArray.length) {

      if (itemArray.length > 1) {
        // analyze results
        console.log(displayArray);
        var displaySortedArray = analysis.sortResult(displayArray);

        // render or display results
        res.render('result', {'searchList': displayArray, 'search': itemArray.join(", ").toUpperCase(), 'analyzedList': displaySortedArray});

        // save results to database only when logged in
        if (res.locals.currentUser) {
          saveData.saveResultAll(displayArray, itemArray, displaySortedArray, res.locals.currentUser._id);
        }
      } else if (itemArray.length === 1) {
        res.render('result', {'searchList': displayArray});
        if (res.locals.currentUser) {
          saveData.saveResult(displayArray, res.locals.currentUser._id);
        }
      }
    }
  });
};
