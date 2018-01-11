const Position = require('../models/position')
const User = require('../models/user');

var AlphaVantageAPI = require('alpha-vantage-cli').AlphaVantageAPI;

var yourApiKey = process.env.DB_APIKEY;

var alphaVantageAPI = new AlphaVantageAPI(yourApiKey, 'compact', true);
var intradayData

const asyncP = require('async-promises');

//Index Home page
exports.index = (req, res)=>{
    res.render('home')
}

exports.positions = (req, res) => {
  var array = [];
  Position.find({}, function(err, result) {
    if (err) throw err;


    return asyncP.each(result, (entry) => {
      return new Promise((resolve) => {
        alphaVantageAPI.getIntradayData(entry.ticker, '1min')
        .then(intradayData => {
          console.log(entry.ticker);
          console.log(intradayData[0].Close);
          array.push({currentPrice: intradayData[0].Close});
          resolve();
        })
      });
    }).then(() => {
      console.log("2");
      console.log(array);
      if (array.length == result.length) {
        res.render('positions', {position: result, priceArray: array})
      }
    });
  });
};

// exports.positions = (req, res)=>{
// 	Position.find({},function(err,result){
// 		if(err) throw err;
//     result.forEach(function(item) {
//       alphaVantageAPI.getIntradayData(item.ticker, '1min')
//       .then(intradayData => {
//         console.log("1")
//         console.log("Intraday data:");
//         console.log(intradayData[0].Close);
        // return intradayData[0].Close;

        // res.render('positions',{position:result, currentPrice: intradayData[0].Close})
    //
    //   })
    // })
			// console.log(result)
		// res.render('positions',{position:result})
//   Position.find({},function(err,result){
// 		if(err) throw err
// 			// console.log(result)
// let tickerArray = [];
// tickerArray = result.map(function(item) {
//   alphaVantageAPI.getIntradayData(item.ticker, '1min', function(intradayData) {
//     return intradayData[0].Close;
//   })
    // .then(intradayData => {
    //   console.log("Intraday data:");
    //   console.log(intradayData[0].Close);

// });
// });
// console.log(tickerArray);
//
//
// 		res.render('positions',{position:result})
//   })
//   var alphaVantageAPI = new AlphaVantageAPI(yourApiKey, 'compact', true);
// //   var intradayData;
//
// // Position.findOne({ticker: 'AAPL'},function(err,result){
// //   alphaVantageAPI.getIntradayData(result.ticker, '1min')
// //     .then(intradayData => {
// //       console.log("Intraday data:");
// //       console.log(intradayData[0].Close);
// //       res.render('positions', {currentPrice: intradayData[0].Close});
// //     })
// //
// //     .catch(err => {
// //         console.error(err);
// //       })
//
//
//
//
//
//
//
//
//
// }

exports.summary = (req, res)=>{
  res.render('summary')
}

//Index Home page
exports.home = (req, res)=>{

    res.render('home')
}
//Users page
// exports.create = (req,res)=>{
//   let newUser = new User({
//     name: req.body.name,
//     email:req.body.email,
//     password:req.body.password
//   })
//   newUser.save(function(err){
//     if(err) throw err
//     User.find({},function(err,result){
//         if(err) throw err
//         // console.log(result)
//         res.redirect('/');
//   })
//
//   })
// }
//Positions page
exports.create = (req, res)=>{
	let newPosition = new Position({
		  name: req.body.name,
  		ticker:  req.body.ticker,
  		units: req.body.units,
  		price: req.body.price,
  		buyDate: req.body.buyDate,


	})

	newPosition.save(function(err){
		if(err) throw err
    Position.find({},function(err,result){
        if(err) throw err
        // console.log(result)
        res.redirect('/positions');
  })

	})
//   Position.find({},function(err,result){
//       if(err) throw err
//       console.log(result)
//       res.render('positions', {position:result});
// });
}
exports.remove= (req,res)=>{
  Position.findByIdAndRemove(req.params.id, function(err){
    if (err) throw err
    res.redirect('/positions')
  })
}



//Updates page
exports.update = (req, res)=>{
  Position.findById(req.params.id, function(err, result) {
    // return res.send(result)
    // if(err) console.log(err)
    // console.log(result);
      res.render('update', {data: result})
  });

}

//Calling API for current price
// var AlphaVantageAPI = require('alpha-vantage-cli').AlphaVantageAPI;
//
// var yourApiKey = 'WMIBV3Q29V0HHRV9';
// var alphaVantageAPI = new AlphaVantageAPI(yourApiKey, 'compact', true);
// var intradayData;
//
//
//     alphaVantageAPI.getIntradayData(this.ticker, '1min')
//       .then(intradayData => {
//         console.log("Intraday data:");
//         console.log(intradayData[0].Close);
//         return intradayData[0].Close
//       })
//
//       .catch(err => {
//           console.error(err);
//         })






// name: String,
//   ticker:  String,
//   units: Number,
//   price: Number,
//   buyDate: String,
//   sellDate: String,
//   closingPrice: Number,
//   user: [{
//   type: Schema.Types.ObjectId,
//   ref: 'User'


// name: String,
//   ticker:  String,
//   units: Number,
//   price: Number,
//   buyDate: String,
//   sellDate: String,
//   closingPrice: Number,
//   user: [{
//   type: Schema.Types.ObjectId,
//   ref: 'User'
