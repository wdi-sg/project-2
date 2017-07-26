function alrLoggedIn (req, res, next) {
  if (req.user) {
    req.flash('You have already logged in')
    res.redirect('/')
  }
  next()
}

function notLoggedIn (req, res, next) {
  if (req.user) {
    req.flash('You are not logged in at the moment')
    res.redirect('/users/login')
  }
  next()
}

module.exports = {
  alrLoggedIn,
  notLoggedIn
}
