const passport = require('../helpers/ppInformation')

exports.login = (req, res) => {
  res.render('auth/login')
}

exports.logout =(req, res)=>{
  req.logout()
  req.flash('success', 'You are now logged out!' )
  res.redirect('/')
}
