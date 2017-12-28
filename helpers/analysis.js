var analyzeResult = function(i, j) {
  if ((Math.abs(i.latitude - j.latitude)) < 0.004 && (Math.abs(i.longitude - j.longitude)) < 0.004) {
    return true;
    // return ({name: i.name + "-" + j.name,
    // latitude: i.latitude + "-" + j.latitude,
    // longitude: i.longitude + "-" + j.longitude});
  }
};

module.exports = analyzeResult;
