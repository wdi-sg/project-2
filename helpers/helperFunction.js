module.exports.getOverall = function(quality, quantity, price) {
  let overall = ((quality + quantity + price) / 3).toFixed(1);
  return overall;
};


module.exports.hasLogged = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('blue', 'Welcome');
    res.redirect('/login');
  }
};


module.exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('red', 'Please login');
    res.redirect('/login');
  }
};


module.exports.randomPhoto = function() {
  // random a number
  // pick the img base on the number
  // return the img
};

module.exports.getDate = function() {
  let monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let date = new Date();
  let calMonth = date.getMonth();
  month = monthName[month];
  let calDate = date.getDate();
  let calYear = date.getFullYear();
  let reviewDate = calMonth + ' ' + calDate + ', ' + calYear;
  return reviewDate;
};
