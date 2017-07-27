var express = require('express')
var router = express.Router()
const passport = require('../config/passport')

router.get('/fblogin', passport.authenticate('facebook'))

router.get('/fbcallback', passport.authenticate('facebook',
  {failureRedirect: '/register'}
),
  function (req, res) {
    res.redirect('/profile')
    // res.send(req.user)
  }
)

module.exports = router
