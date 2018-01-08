// analyze distance between two locations
var analyzeDistance = function(firstLoc, secondLoc) {
  if ((Math.abs(firstLoc.latitude - secondLoc.latitude)) < 0.005 && (Math.abs(firstLoc.longitude - secondLoc.longitude)) < 0.005) {
    return 0;
  } else if ((Math.abs(firstLoc.latitude - secondLoc.latitude)) < 0.01 && (Math.abs(firstLoc.longitude - secondLoc.longitude)) < 0.01) {
    return 1;
  } else if ((Math.abs(firstLoc.latitude - secondLoc.latitude)) < 0.02 && (Math.abs(firstLoc.longitude - secondLoc.longitude)) < 0.02) {
    return 2;
  } else {
    return 3;
  }
};


// join two analyzed locations together
var joinLocation = function(array, firstLoc, secondLoc) {
  // console.log(firstLoc);
  // console.log(secondLoc);
  // check if the element is already included
  array.forEach(function(element) {
    var res = element.result.name.split("=");
    // console.log(res);
    if (firstLoc.name === res[res.length - 1]) {
      array.push({
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
  array.push({
    result: {
      name: firstLoc.name + "=" + secondLoc.name,
      latitude: firstLoc.latitude + "=" + secondLoc.latitude,
      longitude: firstLoc.longitude + "=" + secondLoc.longitude,
      address1: firstLoc.address1 + "=" + secondLoc.address1,
      address2: firstLoc.address2 + "=" + secondLoc.address2
    }
  });
};


// analyze all search results to find locations which meet conditions
var analyzeResult = function(displayedArray) {
  var analyzeArray0 = [];
  var analyzeArray1 = [];
  var analyzeArray2 = [];
  var analyzeArray3 = [];
  var displayAnalyzeObject = {
    tier0: [],
    tier1: [],
    tier2: [],
    tier3: []
  };

  for (var index = 0; index < displayedArray.length; index++) {
    // iterate through 2 adjacent arrays
    displayedArray[index].indivResult.forEach(function(firstLoc) {
      // console.log("test1");
      if (index + 1 < displayedArray.length) {
        displayedArray[index + 1].indivResult.forEach(function(secondLoc) {
          // console.log("test2");
          // var analyzeString = analyzeResult(i, j);

          // check for distance
          switch (analyzeDistance(firstLoc, secondLoc)) {
            case 0:
              joinLocation(analyzeArray0, firstLoc, secondLoc);
              break;
            case 1:
              joinLocation(analyzeArray1, firstLoc, secondLoc);
              break;
            case 2:
              joinLocation(analyzeArray2, firstLoc, secondLoc);
              break;
            case 3:
              joinLocation(analyzeArray3, firstLoc, secondLoc);
              break;
          }
        });
      }
    });
  }

  // check for elements which are present for all search fields
  // console.log(analyzeArray);
  analyzeArray0.forEach(function(element) {
    var res = element.result.name.split("=");
    if (res.length === displayedArray.length) {
      displayAnalyzeObject.tier0.push(element);
    }
  });
  analyzeArray1.forEach(function(element) {
    var res = element.result.name.split("=");
    if (res.length === displayedArray.length) {
      displayAnalyzeObject.tier1.push(element);
    }
  });
  analyzeArray2.forEach(function(element) {
    var res = element.result.name.split("=");
    if (res.length === displayedArray.length) {
      displayAnalyzeObject.tier2.push(element);
    }
  });
  analyzeArray3.forEach(function(element) {
    var res = element.result.name.split("=");
    if (res.length === displayedArray.length) {
      displayAnalyzeObject.tier3.push(element);
    }
  });

  return displayAnalyzeObject;
};


// sort analyzed results to display on page
exports.sortResult = function(displayedArray) {
  var displayAnalyzeObject = analyzeResult(displayedArray);
  var displaySortedObject = {
    tier0: [],
    tier1: [],
    tier2: [],
    tier3: []
  };
  // console.log(displayAnalyzeObject);

  Object.keys(displayAnalyzeObject).forEach(function(key, index) {
    displayAnalyzeObject[key].forEach(function(element) {
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
      displaySortedObject[key].push({'sortedlist': sortedArray});
    });
  });

  return displaySortedObject;
};

// refactor code
// module.exports = sortResult;
