var express = require('express')
var router = express.Router()
const passport = require('../config/passport')

router.get('/iglogin', passport.authenticate('instagram'))

router.get('/igcallback', passport.authenticate('instagram',
  {failureRedirect: '/register'}
),
  function (req, res) {
    res.redirect('/profile')
    // res.send(req.user)
  }
)

module.exports = router
