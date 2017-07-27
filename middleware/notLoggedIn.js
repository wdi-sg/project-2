module.exports = function(req, res, next) {
  if (req.user) {
    flash: req.flash('message', 'You have already logged in')
    res.redirect('/users/profile')
  } else {
    next()
  }
};
