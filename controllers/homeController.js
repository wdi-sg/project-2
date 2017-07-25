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
	//console.log('aaaaaaaaaaa REQ', req)
	console.log('aaaaaaaaaaa REQ.USER aaaaaaaaaaaaa')
	console.log(req.user)
	return 0
}

// buy ETF
function addPosition (req, res) {

}

// sell ETF

// 

// retrieve 'universal' list of ETFs
function fullListETF (req, res) {
  Instrument.find({}, function (err, foundList) {
    if (err) res.send(err)
    //console.log('xyxyxyxyx ', foundList)
    return foundList	
    })
}


module.exports = {
	marketValue,
	fullListETF
}

// retrieve 'universal' list of ETFs
// function register (req, res) {
//   // getting all places from my list of places in the db
//   Place.find({}, function (err, allPlaces) {
//     if (err) res.send(err)

//     res.render('users/new', {
//       places: allPlaces,
//       flash: req.flash('errors')
//     })
//   })


