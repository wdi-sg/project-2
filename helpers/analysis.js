// analyze distance between two locations
var analyzeDistance = function(i, j) {
  if ((Math.abs(i.latitude - j.latitude)) < 0.005 && (Math.abs(i.longitude - j.longitude)) < 0.005) {
    return 0;
  } else if ((Math.abs(i.latitude - j.latitude)) < 0.01 && (Math.abs(i.longitude - j.longitude)) < 0.01) {
    return 1;
  } else if ((Math.abs(i.latitude - j.latitude)) < 0.02 && (Math.abs(i.longitude - j.longitude)) < 0.02) {
    return 2;
  } else {
    return 3;
  }
};


// join two analyzed locations together
var joinLocation = function(array, i, j) {
  // check if the element is already included
  array.forEach(function(element) {
    var res = element.result.name.split("=");
    if (i.name === res[res.length - 1]) {
      // console.log(i.name);
      array.push({
        result: {
          name: element.result.name + "=" + j.name,
          latitude: element.result.latitude + "=" + j.latitude,
          longitude: element.result.longitude + "=" + j.longitude,
          address1: element.result.address1 + "=" + j.address1,
          address2: element.result.address2 + "=" + j.address2
        }
      });
    }
  });
  array.push({
    result: {
      name: i.name + "=" + j.name,
      latitude: i.latitude + "=" + j.latitude,
      longitude: i.longitude + "=" + j.longitude,
      address1: i.address1 + "=" + j.address1,
      address2: i.address2 + "=" + j.address2
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
    displayedArray[index].indivResult.forEach(function(i) {
      // console.log("test1");
      if (index + 1 < displayedArray.length) {
        displayedArray[index + 1].indivResult.forEach(function(j) {
          // console.log("test2");
          // var analyzeString = analyzeResult(i, j);

          // check for distance
          switch (analyzeDistance(i, j)) {
            case 0:
              joinLocation(analyzeArray0, i, j);
              break;
            case 1:
              joinLocation(analyzeArray1, i, j);
              break;
            case 2:
              joinLocation(analyzeArray2, i, j);
              break;
            case 3:
              joinLocation(analyzeArray3, i, j);
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
var sortResult = function(displayedArray) {
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

module.exports = sortResult;
