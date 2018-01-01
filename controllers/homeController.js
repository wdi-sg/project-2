const User = require('../models/user')

exports.index = (req, res) => {
    res.render('welcome', { user : req.user })
}

exports.home = (req, res) => {
    res.render('home', { user : req.user })
}
