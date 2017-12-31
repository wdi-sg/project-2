const isLoggedIn = (req, res, next) => {
  if (req.user) {
    res.redirect("/")
  } else {
    next()
  }
}

const hasLoggedOut = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.redirect("/")
  }
}

const compare = (item1, item2) => {
  return item1 === item2
}

module.exports = {
  hasLoggedOut,
  isLoggedIn,
  compare
}
