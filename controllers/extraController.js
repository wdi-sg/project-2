module.exports.like = function(req, res) {
  res.redirect('base/review');
};


module.exports.write = function(req, res) {
  req.flash('blue', 'Added comment');
  res.redirect('/review');
};


module.exports.delete = function(req, res) {
  res.sendStatus(200);
};
