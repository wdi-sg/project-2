module.exports = (req,res,next) => {
  console.log(req.user)
  if (!req.user) {
    req.flash('error', 'You must be logged in to access that page')
    res.redirect('/auth/login')
  }
  else {
    next()
  }
}
