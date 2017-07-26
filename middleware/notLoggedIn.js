module.exports = function(req, res, next) {
  if (req.user) {
    req.flash('You have already logged in')
    res.redirect('/users/profile')
  } else {
    next();
  }
};
