module.exports = function(req, res, next) {
  if (!req.user) {
    req.flash('You are not logged in at the moment')
    res.redirect('/users/login')
  } else {
    next();
  }
};
