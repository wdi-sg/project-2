exports.login = (req, res) => {
  res.render('auth/login')
}

exports.logout = (req, res) => {
  req.logout()
  req.flash('success', 'You have successfully logged out!')
  res.redirect('/')
}
