require('colors')

module.exports = (req, res, next) => {
  if (!req.user) {
    console.log('ATTEMPTED TO ACCESS WITHOUT LOGIN'.red)
    res.redirect('/users/login')
  } else {
    console.log('USER ACCESS GRANTED FOR USER: '.blue + req.user.name)
    next()
  }
}