module.exports = (req, res, next) => {
  if (!req.user) {
    req.flash('error', 'Please Log In')
    res.redirect('/auth/login')
    return
  }
  next()
}
