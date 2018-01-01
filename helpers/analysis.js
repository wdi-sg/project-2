// analyze distance between two locations
var analyzeDistance = function(i, j) {
  if ((Math.abs(i.latitude - j.latitude)) < 0.005 && (Math.abs(i.longitude - j.longitude)) < 0.005) {
    return true;
  }
};


// analyze all search results to find locations which meet conditions
var analyzeResult = function(displayedArray) {
  var analyzeArray = [];
  var displayAnalyzeArray = [];

  for (var index = 0; index < displayedArray.length; index++) {
    // iterate through 2 adjacent arrays
    displayedArray[index].indivResult.forEach(function(i) {
      // console.log("test1");
      if (index + 1 < displayedArray.length) {
        displayedArray[index + 1].indivResult.forEach(function(j) {
          // console.log("test2");
          // var analyzeString = analyzeResult(i, j);

          // check for distance
          if (analyzeDistance(i, j)) {

            // check if the element is already included
            analyzeArray.forEach(function(element) {
              var res = element.result.name.split("=");
              if (i.name === res[res.length - 1]) {
                // console.log(i.name);
                analyzeArray.push({
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
            analyzeArray.push({
              result: {
                name: i.name + "=" + j.name,
                latitude: i.latitude + "=" + j.latitude,
                longitude: i.longitude + "=" + j.longitude,
                address1: i.address1 + "=" + j.address1,
                address2: i.address2 + "=" + j.address2
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
    var res = element.result.name.split("=");
    if (res.length === displayedArray.length) {
      // console.log(element);
      displayAnalyzeArray.push(element);
    }
  });

  return displayAnalyzeArray;
};


// sort analyzed results to display on page
var sortResult = function(displayedArray) {
  var displayAnalyzeArray = analyzeResult(displayedArray);
  var displaySortedArray = [];

  displayAnalyzeArray.forEach(function(element) {
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
    displaySortedArray.push({'sortedlist': sortedArray});
  });

  return displaySortedArray;
};

module.exports = sortResult;
