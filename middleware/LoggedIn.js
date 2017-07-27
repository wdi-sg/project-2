module.exports = function(req, res, next) {
  if (!req.user) {
    flash: req.flash('message', 'Please log in')
    res.redirect('/users/login')
  } else {
    next()
  }
};
