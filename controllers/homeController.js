require('dotenv').config()
const User = require('../models/User')
const Portfolio = require('../models/Portfolio')
const Position = require('../models/Position')
const Instrument = require('../models/Instrument')
var request = require('request')

// ** NOT IN USE ** return user's current portfolio positions
function portHoldings (req, res) {
	console.log(req) 
}

// ** NOT IN USE ** return user's portfolio market value as of DD MM YYYY
function marketValue (req, res) {
	//console.log('aaaaaaaaaaa REQ', req)
	console.log('fn:marketValue:REQ.USER')
	console.log(req.user)
	return 12
}

function buildPage (req, res) {

// nested callback to find retrieve required data before rendering page?
// http://blog.revathskumar.com/2015/07/using-promises-with-mongoosejs.html
// callback hell?

	Instrument.find({}, function (err, instrumentsList) {
    	if (err) res.send(err)

    	User
		.findOne({_id: req.user.id})
		.exec(function (err, foundUser) {

			//console.log('portfolio ID: ', foundUser.portfolio[0])

			Portfolio
			.findOne({_id: foundUser.portfolio[0]})
			.exec(function (err, foundPortfolio) {

				if (!foundPortfolio) {
					res.render('home/home', {
			  			userDisplayName: req.user.name, 
			  			portMktVal: 5, // marketValue(req, res),
			  			instrumentsList: instrumentsList
		  			})
				} else {

					//console.log('fn: buildPage: ', foundPortfolio.positions)

					Position // find all positions given an array of positions IDs  
					.find({
						_id: {
							$in: foundPortfolio.positions
						}
					}, function(err, foundInstruments) {
						// populate an array of positions
						Instrument.populate(foundInstruments, 'instrument', function (err, populatedInstruments) {

							//console.log('fn:buildPage ', populatedInstruments)

							//populatedInstruments[].instrument.name
			
							res.render('home/home', {
					  			userDisplayName: req.user.name, 
					  			portMktVal: 6, //marketValue(req, res),
					  			instrumentsList: instrumentsList,
					  			portHolding: populatedInstruments				  		
				  			})
				  			console.log('buildpage rendering is done...',Date())
						})
					})


					// Position // find all positions given an array of positions IDs  
					// .find({
					// 	_id: {
					// 		$in: foundPortfolio.positions
					// 	}
					// }, function(err, foundInstruments) {

					// 	Instrument.populate(foundInstruments, 'instrument', function (err, instr) {
					// 		console.log(instr)
					// 	})
					// 	// for (var pos=0; pos<foundPortfolio.positions.length; pos++) {
					// 	// var position = foundPortfolio.positions[pos]

					// 	// foundInstruments.populate('instrument')
					// })

					// foundPortfolio
					// .find() // find all portfolio holdings
					// .exec(function (err, xxx) {
					// 	res.render('home/home', {
				 //  			userDisplayName: req.user.name, 
				 //  			portMktVal: marketValue(req, res),
				 //  			instrumentsList: instrumentsList,
				 //  			portHolding: portfolio(req,res)
			  // 			})	
					// })								
				}
			})
		})		    	
	})
}

// buy ETF
function addPosition (req, res) {
	//console.log('in add Position: just id: ', req.body.instrumentID)

	//console.log('fn:addPosition: user ID: ', req.user.id)


	User
	.findOne({_id: req.user.id})
	.exec(function (err, foundUser) {

		//console.log('portfolio ID: ', foundUser.portfolio[0])

		Portfolio
		.findOne({_id: foundUser.portfolio[0]})
		.exec(function (err, foundPortfolio) {

			//console.log('portfolio name: ', foundPortfolio)

			var newPosition = new Position ({
			  date: new Date().toISOString(),
			  quantity: 1, // current default
			  unitCost: 23.00,
			  instrument: req.body.instrumentID // only one instance of instrument to one position
			})

			//console.log('fn:addPosition: new position: ', newPosition)

			newPosition.save(function (err, savedPosition) {
				if (err) res.send(err)
      			foundPortfolio.positions.push(savedPosition.id)
				foundPortfolio.save(function (err, savePortfolio) {
					console.log('save is done...',Date())
					//buildPage(req,res)					

					//console.log('xxxxyyyy ', savedPosition)

					savedPosition
					.populate('instrument', function (err, populatedPosition) {
						console.log('in newpos.save: ', populatedPosition)
						res.send({
							savedPosition: populatedPosition
						})
					})
				})


			})
		}) 
	})
}

// sell ETF


// get price from API
function getEODMarketPrice (req, res) {

	Instrument
	.findOne({_id: req.body.instrumentID})
	.exec(function (err, foundInstrument) {

		var url = process.env.QUANDL_URL + foundInstrument.databaseCode + '/' + foundInstrument.ticker + '/data.json?api_key=' + process.env.QUANDL_API_KEY

		console.log(url)

		request(url, function (err, apiRes, data) {
	  		console.log('error:', err); // Print the error if one occurred
	  		console.log('statusCode:', apiRes && apiRes.statusCode); // Print the response status code if a response was received
	  		//console.log('body:', JSON.stringify(data, undefined, '\t')); 


	  		res.send(data)








		})
	})
}

module.exports = {
	marketValue,
	buildPage,
	addPosition,
	getEODMarketPrice
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

