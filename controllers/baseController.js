module.exports.home = function(req, res) {
  res.render('base/home');
};

module.exports.profile = function(req, res) {
  res.render('base/profile');
};

module.exports.review = function(req, res) {
  res.render('base/review');
};
