var analyzeResult = function(i, j) {
  if ((Math.abs(i.latitude - j.latitude)) < 0.004 && (Math.abs(i.longitude - j.longitude)) < 0.004) {
    return true;
  }
};

module.exports = analyzeResult;
