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

// buy ETF
function addPosition (req, res) {
	console.log('in add Position: just id: ', req.body.instrumentID)

	//Instrument.findOne({}, function (err, instrumentsList) {

	// find portfolio first
	
	console.log('xxx user ID: ', req.user.id)


	User.findOne({_id: req.user.id}).exec(function (err, result) {
		console.log(result)
	})
	// .populate('portfolio')
	// .exec(function (err, userPortfolio) {
	// 	if (err) res.send(err)
	// 	// if (!userPortfolio) { // no portfolio yet
	// 	// 	var newPortfolio = 
	// 	// }

	// })


	// var newPosition = new Position ({
	//   date: new Date().toISOString(),
	//   quantity: 1,
	//   price: 23.00, // to be retrieved from API
	//   instrument: req.body.instrumentID // only one instance of instrument to one position
	// })
    
	// console.log(newPosition)

	// newPosition
	// .populate('instrument')
	// .exec(function (err, jb) {
 //  		if (err) throw err
 //  		console.log(jb)
	// })

	// newPosition.save(function (err, createdPosition) {
	// 	if (err) res.send(err)
 //      	createdPosition.songs.push(createdSong.id)
	// 	createdAlbum.save()
	// })

    	//if (err) res.send(err)



	res.render('home/home')
}

// sell ETF


module.exports = {
	marketValue,
	buildPage,
	addPosition
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


