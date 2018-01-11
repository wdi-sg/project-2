const mongoose = require('mongoose')
const Schema = mongoose.Schema



const positionSchema = new Schema({
  name: String,
  ticker:  String,
  units: Number,
  price: Number,
  buyDate: String,

  user: [{
  type: Schema.Types.ObjectId,
  ref: 'User'
}]
})

//Calculate total $$$ invested per position
positionSchema.virtual('sumInvested').get(function () {
  return this.price * this.units
})
//Get current price of Stock
// var AlphaVantageAPI = require('alpha-vantage-cli').AlphaVantageAPI;
//
// var yourApiKey = 'WMIBV3Q29V0HHRV9';
// var alphaVantageAPI = new AlphaVantageAPI(yourApiKey, 'compact', true);
// var intradayData

// alphaVantageAPI.getIntradayData(this.ticker, '1min')
//     .then(intradayData => {
//         console.log("Intraday data:");
//         console.log(intradayData);
//     })
//     .catch(err => {
//         console.error(err);
//     });
    // positionSchema.virtual('currentPrice').get(function(){
    //     alphaVantageAPI.getIntradayData(this.ticker, '1min')
    //       .then(intradayData => {
    //         console.log("Intraday data:");
    //         console.log(intradayData[0].Close);
    //         return intradayData[0].Close
    //       })
    //
    //       .catch(err => {
    //           console.error(err);
    //       });
    //
    // })
    positionSchema.virtual('currentMarketValue').get(function () {
      return this.currentPrice * this.units
    })

    positionSchema.virtual('amountEarned').get(function () {
      return this.currentMarketValue - this.sumInvested
    })

    // positionSchema.virtual('currentPrice').get(function(){
    //   return intradayData[0].Close
    // })
// var urlPrice='https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+ this.ticker +'&interval=1min&apikey=WMIBV3Q29V0HHRV9'
// positionSchema.virtual('currentPrice').get(function () {
//   urlPrice.
// })

// positionSchema.virtual('currentMarketValue').get(function () {
//   if (!this.closingPrice) return this.price * this.units
//   return this.closingPrice * this.units
// })

// positionSchema.pre('save', function(next) {
//   var position = this
//
//   if (!position.closingPrice)
//   position.closingPrice = position.price
//     next()
//   })


const Position = mongoose.model('Position', positionSchema)

module.exports = Position
