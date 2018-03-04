// joins all locations together
var joinLocation = function(firstLoc, secondLoc, arrayAllResults) {
  // check if element is already included in array
  arrayAllResults.forEach(function(element) {
    var res = element.result.name.split("=");
    // console.log(res);
    if (firstLoc.name === res[res.length - 1]) {
      arrayAllResults.push({
        result: {
          name: element.result.name + "=" + secondLoc.name,
          latitude: element.result.latitude + "=" + secondLoc.latitude,
          longitude: element.result.longitude + "=" + secondLoc.longitude,
          address1: element.result.address1 + "=" + secondLoc.address1,
          address2: element.result.address2 + "=" + secondLoc.address2
        }
      });
    }
    // console.log(array);
  });
  // join two analyzed locations together
  arrayAllResults.push({
    result: {
      name: firstLoc.name + "=" + secondLoc.name,
      latitude: firstLoc.latitude + "=" + secondLoc.latitude,
      longitude: firstLoc.longitude + "=" + secondLoc.longitude,
      address1: firstLoc.address1 + "=" + secondLoc.address1,
      address2: firstLoc.address2 + "=" + secondLoc.address2
    }
  });
};


// calculates the closeness of the analyzed locations
var calcRangeIndex = function(element) {
  var latitudeArray = [];
  var longitudeArray = [];

  var latitudeSplitArray = element.result.latitude.split("=");
  latitudeSplitArray.forEach(function(lat) {
    latitudeArray.push(parseFloat(lat));
  });
  var latitudeDiff = Math.max(...latitudeArray) - Math.min(...latitudeArray);

  var longitudeSplitArray = element.result.longitude.split("=");
  longitudeSplitArray.forEach(function(long) {
    longitudeArray.push(parseFloat(long));
  });
  var longitudeDiff = Math.max(...longitudeArray) - Math.min(...longitudeArray);

  var rangeIndex = (latitudeDiff + longitudeDiff) / latitudeArray.length;
  // console.log(rangeIndex);
  return rangeIndex;
};



// loops through the arrays and analyze the distance
var analyzeResult = function(displayArray) {
  var arrayAllResults = [];
  var arrayAnalyzeResults = [];
  // iterate through all results
  for (var index = 0; index < displayArray.length; index++) {
    // iterate through 2 adjacent arrays
    displayArray[index].indivResult.forEach(function(firstLoc) {
      if (index + 1 < displayArray.length) {
        displayArray[index + 1].indivResult.forEach(function(secondLoc) {
          joinLocation(firstLoc, secondLoc, arrayAllResults);
        });
      }
    });
  }

  // finds combinations that are of the correct length
  arrayAllResults.forEach(function(element) {
    var res = element.result.name.split("=");
    if (res.length === displayArray.length) {
      arrayAnalyzeResults.push(element);
    }
  });

  // calculates the closeness of the analyzed locations
  arrayAnalyzeResults.forEach(function(element) {
    element.result["range"] = calcRangeIndex(element);
  });

  // sorts the combinations from closest to furthest
  arrayAnalyzeResults.sort(function(sortOne, sortTwo) {
    return sortOne.result.range - sortTwo.result.range
  });
  // console.log(arrayAnalyzeResults);
  return arrayAnalyzeResults;
};


// arrange results to be displayed through handlebars
module.exports.sortResult = function(displayArray) {
  var displaySortedArray = [];
  var arrayAnalyzeResults = analyzeResult(displayArray);
  // console.log(arrayAnalyzeResults);

  arrayAnalyzeResults.forEach(function(element) {
    var sortedArray = [];
    var name = element.result.name.split("=");
    var latitude = element.result.latitude.split("=");
    var longitude = element.result.longitude.split("=");
    var address1 = element.result.address1.split("=");
    var address2 = element.result.address2.split("=");

    for (var index = 0; index < name.length; index++) {
      var sortedObject = {
        name: name[index],
        latitude: latitude[index],
        longitude: longitude[index],
        address1: address1[index],
        address2: address2[index]
      };

      // array for one match
      sortedArray.push(sortedObject);
      // console.log(sortedArray);
    }

    // array for many matches
    displaySortedArray.push({'sortedList': sortedArray, 'range': element.result.range});
  });

  // console.log(displaySortedArray);
  return displaySortedArray;
};

// refactor code
// module.exports = sortResult;
