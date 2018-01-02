module.exports.home = function(req, res) {

  // find review and send to home

  res.render('base/home');
};

module.exports.profile = function(req, res) {

// place userid at navbar
// find userid and send info to profile page

  res.render('base/profile');
};

module.exports.review = function(req, res) {
// place reviewid on review home page individual review
// find reviewid send to full review page



  res.render('base/review');
};
