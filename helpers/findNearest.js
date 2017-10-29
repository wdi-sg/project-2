//need to req distance?
const distance = require('./distance.js')
var findNearest = (stops, loc) => {
  stops.sort(function compare(a, b) {
    if (distance(loc, a) < distance(loc, b)) {
      return -1;
    }
    if (distance(loc, a) > distance(loc, b)) {
      return 1;
    }
    return 0;
  })
  var stopDistArr = []
  for (var i = 0; i < 5; i++) {
    stopDistArr.push({
      stop: stops[i],
      dist: distance(loc, stops[i])
    })
  }
  console.log(stopDistArr);
  return stopDistArr
} //end findNearest

module.exports = findNearest
