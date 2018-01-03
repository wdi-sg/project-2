module.exports.add = function(req, res) {
  req.flash('light-blue', 'Bookmark added');
  res.redirect('/review');
};


module.exports.edit = function(req, res) {
  res.redirect('base/profile');
};


module.exports.delete = function(req, res) {
  res.sendStatus(200);
};
