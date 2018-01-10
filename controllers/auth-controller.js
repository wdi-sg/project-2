const passport = require('../helpers/passport');
const User = require('../models/user');

// `/signin` Route
exports.signin = (req, res) => {
	console.log(req.body);
	res.render('home');
}

// `/signout` Route
exports.signout = (req, res) => {
	req.logout()
	req.flash('success', 'You have signed out')
	res.redirect('/');
}

// `/signup` Route
exports.signup = (req, res) => {
	console.log(req.body);
	req.checkBody('up_firstname', 'Please enter your first name').notEmpty();
	req.checkBody('up_lastname', 'Please enter your last name').notEmpty();
	req.checkBody('up_email', 'Please enter an email address').notEmpty();
	req.checkBody('up_password', 'Please enter a password').notEmpty();
	req.checkBody('up_confirm_password', 'Please confirm your password').notEmpty();
	if (req.body.up_confirm_password) {
		req.checkBody('up_password', 'You did not enter the same password').equals(req.body.up_confirm_password);
	}

	let errors = req.validationErrors();
	if (errors) {
		console.log('Error encountered…');
		console.log(errors);
		res.render('home', {'errors': errors});
	} else {
		console.log('creating account…');
		User.create({
			auth: 'local',
			local: {
				firstname: req.body.up_firstname,
				lastname: req.body.up_lastname,
				email: req.body.up_email,
				password: req.body.up_password	
			},
			twitter: {}
		}, (err, createdUser) => {
			if (err) {
				console.log('Error creating account…')
				console.log(err)
				req.flash('error', 'Unable to create user account')
				res.render('home');
			} else {
				console.log(createdUser);
				passport.authenticate('local', {
					successRedirect: '/home',
					successFlash: 'Account created and signed in'
				})(req, res);
			}
		});
	}
}