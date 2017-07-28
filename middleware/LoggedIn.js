module.exports = function(req, res, next) {
  if (req.user) {
    flash: req.flash('message', 'YOU ARE CURRENTLY LOGGED IN')
    res.redirect('/users/profile')
  } else {
    next()
  }
}
