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
	return 12
}

// buy ETF
function addPosition (req, res) {

}

// sell ETF

// 

// retrieve 'universal' list of ETFs
// function instrumentsList (req, res) {
// 	// var aa = Instrument.find({})
// 	// 	console.log(aa)
// 	// return aa
//   Instrument.find({}, function (err, foundList) {
//     if (err) res.send(err)
//     //console.log('xyxyxyxyx ', foundList)
//     res.send(foundList)	 // foundList	
//     })
//   // //return 34
// }

function buildPage (req, res) {

// nested callback to find retrieve required data before rendering page?
// http://blog.revathskumar.com/2015/07/using-promises-with-mongoosejs.html
// callback hell?

	Instrument.find({}, function (err, instrumentsList) {
    	if (err) res.send(err)

    	res.render('home/home', {
  			userDisplayName: req.user.name, 
  			portMktVal: marketValue(req, res),
  			instrumentsList: instrumentsList
  		})
	})
}


module.exports = {
	marketValue,
	buildPage
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


