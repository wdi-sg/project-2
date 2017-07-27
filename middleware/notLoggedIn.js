module.exports = function(req, res, next) {
  if (!req.user) {
    flash: req.flash('message', 'LOG IN REQUIRED')
    res.redirect('/users/login')
  } else {
    next()
  }
}
