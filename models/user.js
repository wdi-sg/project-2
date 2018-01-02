const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
// var SALT_WORK_FACTOR = 10;

const User = mongoose.model('User', userSchema);

const userSchema = new Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	username: {
		type: String,
		unique: true
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;