// const passport = require('../helpers/ppInformation');
// const User = require('../models/user');

// `/signin` Route
exports.signin = (req, res) => {
	res.render('auth/signin');
}

// `/signup` Route
exports.signup = (req, res) => {
	res.render('auth/signup');
}

// `/logout` Route
exports.signout = (req, res) => {
	// req.logout()
	// req.flash('success', 'You are logged out')
	res.redirect('/');
}