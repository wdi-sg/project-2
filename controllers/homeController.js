const User = require('../models/User')
const Portfolio = require('../models/Portfolio')
const Position = require('../models/Position')
const Instrument = require('../models/Instrument')

// return user's current portfolio positions
function listPositions (req, res) {
	console.log(req)
}

// return user's portfolio market value as of DD MM YYYY
function marketValue (req, res) {
	console.log('qwerty ', req)
	return 0
}

// buy ETF

// sell ETF

// 

module.exports = {
	marketValue
}