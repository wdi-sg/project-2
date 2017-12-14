const isLoggedIn = (req, res, next) => {
  if (req.user) {
    res.redirect('/')
  } else {
    next()
  }
}

// the opposite of the function above
const hasLoggedOut = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.redirect('/')
  }
}

const isPLoggedIn = (req, res, next) => {
  if (req.user) {
    res.redirect('/')
  } else {
    next()
  }
}
module.exports = {
  hasLoggedOut,
  isLoggedIn,
  isPLoggedIn
}
