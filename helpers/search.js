// not in use
//
// const List = require('../models/list');
//
// var itemArray = [];
//
// var searchResult = function(req, res) {
//   for (var index = 0; index < 2; index++) {
//     itemArray.push(req.body["entry" + index]);
//   }
//
//   // query API for results
//   itemArray.forEach(function(element) {
//     client.search({
//       location: 'Singapore',
//       limit: 10,
//       term: element
//     }).then(response => {
//       var result = response.jsonBody.businesses;
//       var resultArray = [];
//       result.forEach(function(business) {
//         resultArray.push({
//           name: business.name,
//           latitude: business.coordinates.latitude,
//           longitude: business.coordinates.longitude
//         });
//       });
//       console.log(element);
//
//       // writes results to database
//       List.create({
//         indivItem: element,
//         indivResult: resultArray
//       });
//     }).catch(e => {
//       console.log(e);
//     });
//   });
// };
//
// module.exports = searchResult;
