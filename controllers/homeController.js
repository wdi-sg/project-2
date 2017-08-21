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
			

							//format price: 2 decimal places
							var formattedArr = []
							for (var i = 0; i < populatedInstruments.length; i++) {
								
								var formattedObj = {
									id : populatedInstruments[i]._id,
									name : populatedInstruments[i].instrument.name,
									quantity : populatedInstruments[i].quantity,
									unitCost : 0
								}
								var formattedPrice = '$' + populatedInstruments[i].unitCost.toFixed(2)
								formattedObj.unitCost = formattedPrice
								//console.log('aaaaaaaaa ', formattedObj)
								formattedArr.push(formattedObj)
							}

							//var formattedArr = []

							// populatedInstruments.forEach(function (instrument, index) {
								
							// 	var formattedInstrument = instrument
							// 	var formattedPrice = '$' + instrument.unitCost.toFixed(2)
							// 	console.log('aaaaaaaa ', formattedInstrument.unitCost)
							// 	formattedInstrument.unitCost = formattedPrice
							// 	console.log('bbbbbbbbb ', formattedInstrument.unitCost)
							// 	formattedArr.push(formattedInstrument)
							// 	// = '$' + instrument.unitCost.toFixed(2)
							// 	// console.log('formatted: ', formatted)
							// 	// console.log(typeof(instrument.unitCost))


							// 	// instrument.unitCost = formatted

							// 	//console.log('aaaaaaaa ', populatedInstruments[index])
							// 	//console.log('xxxxxxxxxxxxx ', instrument.unitCost.toFixed(2))
							// 	//populatedInstruments[index].unitCost = '$' + instrument.unitCost.toFixed(2)

							// 	//console.log('yyyyyyyyyyyyy ', populatedInstruments[index].unitCost)
							// 	//console.log('zzzzzzzzzzzzz ', typeof(array[index].unitCosts))
							// })

							// formattedArr.forEach(function (instrument) {
							// 	console.log('xxxxxxxxxxxxx ', instrument.unitCost)
							// })
							
							// formattedArr.forEach(function (instrument) {
							// 	console.log('xxxxxxxxxxxxx ', instrument.unitCost)
							// })

							res.render('home/home', {
					  			userDisplayName: req.user.name, 
					  			portMktVal: 6, //dummmy value; marketValue(req, res),
					  			instrumentsList: instrumentsList,
					  			portHolding: formattedArr // populatedInstruments 				  		
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

	//getEODMarketPrice
	// console.log('XXXXXXXXXX ', req.body.instrumentID, ' YYYYYYYYYY')
	// console.log (getEODMarketPrice(req, res)) 
	// console.log (' ZZZZZZZZZZZZZZz ')

	//getEODMarketPrice for buy transaction 
	Instrument
	.findOne({_id: req.body.instrumentID})
	.exec(function (err, foundInstrument) {

		var url = process.env.QUANDL_URL + foundInstrument.databaseCode + '/' + foundInstrument.ticker + '/data.json?api_key=' + process.env.QUANDL_API_KEY

		request(url, function (err, apiRes, data) {
	  		console.log('error:', err); // Print the error if one occurred
	  		console.log('statusCode:', apiRes && apiRes.statusCode); // Print the response status code if a response was received
          	
          	var parseData = JSON.parse(data)
          	var eodMktPrice = parseData.dataset_data.data[0][4]
          	
          	//console.log('XXXXXXXXXX ', typeof(eodMktPrice), ' YYYYYYYYYYYYY')
		
          	User
			.findOne({_id: req.user.id})
			.exec(function (err, foundUser) {

				//console.log('portfolio ID: ', foundUser.portfolio[0])

				// simulate spot prices at time of 'buy', +/- 2% fluctuation from previous eod price
				var max = 1.02 * eodMktPrice
				var min = .98 * eodMktPrice
				transactionPrice = (Math.random() * (max - min) + min).toFixed(2)
				//console.log('XXXXXXXXXX ', transactionPrice, ' YYYYYYYYYYYYY')

				Portfolio
				.findOne({_id: foundUser.portfolio[0]})
				.exec(function (err, foundPortfolio) {

					//console.log('portfolio name: ', foundPortfolio)

					var newPosition = new Position ({
					  date: new Date().toISOString(),
					  quantity: 1, // current default
					  unitCost: transactionPrice,
					  instrument: req.body.instrumentID // only one instance of instrument to one position
					})

					//console.log('fn:addPosition: new position: ', newPosition)

					newPosition.save(function (err, savedPosition) {
						if (err) res.send(err)
							console.log('newposition.save, save position ID: ', savedPosition._id)
		      			foundPortfolio.positions.push(savedPosition._id)
						foundPortfolio.save(function (err, savePortfolio) {
							console.log('save is done...',Date())
							//buildPage(req,res)					

							//console.log('xxxxyyyy ', savedPosition)

							savedPosition
							.populate('instrument', function (err, populatedPosition) {
								console.log('in newpos.save: ', populatedPosition)
								var formattedObj = {
									id : populatedPosition._id,
									name : populatedPosition.instrument.name,
									quantity : populatedPosition.quantity,
									unitCost : 0
								}
								var formattedPrice = '$' + populatedPosition.unitCost.toFixed(2)
								formattedObj.unitCost = formattedPrice
								res.send({
									savedPosition: formattedObj //populatedPosition
								})
							})
						})
					})
				}) 
			})
		})  // request(url, function (err, apiRes, data)
	}) // Instrument.findOne().exec(function (err, foundInstrument) {	
}

// sell ETF
function sellPosition (req, res) {

	User
	.findOne({_id: req.user.id})
	.exec(function (err, foundUser) {

		Portfolio
		.findOne({_id: foundUser.portfolio[0]})
		.exec(function (err, foundPortfolio) {

				// unhandled error!
				
				if (foundPortfolio) {

					console.log('found Positions:')
					console.log(foundPortfolio.positions)

					console.log('position to sell:', req.body.positionID)
					console.log('position to sell typeof:', typeof(req.body.positionID))

					// remove position document from Position collection
					Position 
					.findOneAndRemove({_id: req.body.positionID}, function (err, deletedPosition) {
						
						if (err) res.send(err)

						console.log('abababa ', deletedPosition)

						// unhandled error!
						
						// remove position ID from user's portfolio						
						var index = foundPortfolio.positions.indexOf(req.body.positionID)
						if (index !== -1) {
							foundPortfolio.positions.splice(index, 1) 
						} else {
							//unhandled error!
						}
						foundPortfolio.save(function (err) {
							// unhandled error!
							console.log('jkjkjk ', deletedPosition)
							var response = {
        						deletedId: deletedPosition._id
    						}
    						res.send(response)

						})						
					})

				}
			})
	})


}	

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


// function displayChart () {
	
// }



module.exports = {
	marketValue,
	buildPage,
	addPosition,
	sellPosition,
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

