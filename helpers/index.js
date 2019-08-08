const isLoggedIn = (req, res, next) => {
  if(req.user) {
    res.redirect('/')
  } else {
    next()
  }
}

// the opposite of the function above
const hasLoggedOut = (req, res, next) => {
  if(req.user) {
    next()
  } else {
    res.redirect('/')
  }
}

const isNotLoggedIn = (req, res, next) => {
  if(!req.user) {
    res.redirect('/register')
  } else {
    next()
  }
}

module.exports = {
  hasLoggedOut,
  isLoggedIn,
  isNotLoggedIn
}
