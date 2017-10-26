var osmosis = require('osmosis')

osmosis
.get('www.burpple.com/sg/hot')
.find('.topVenue-details-info-details')
.set({
  'place': 'p.headingMedium'
})
// .data(function (listing) {
//   console.log(listing)
//
//   // Restaurant.create(listing)
//
//     // do something with listing data
// })
.data(result=>{
  console.log(result);
})
.log(console.log)
.error(console.log)
// .debug(console.log)
