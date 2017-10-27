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

const Logged = (req, res, next) => {
  if(req.student) {
    res.redirect('/')
  } else {
    next()
  }
}

const LoggedOut = (req, res, next) => {
  if(req.student) {
    next()
  } else {
    res.redirect('/')
  }
}

module.exports = {
  hasLoggedOut,
  isLoggedIn,
  Logged,
  LoggedOut
}
