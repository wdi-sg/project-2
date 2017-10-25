


router.post('/test', (req, res) => {

  // req.body.month === 3
  var month = req.body.month
  var deposit = req.body.deposit

  // get collection
  Fixed.find() // get all bank
    .then((data) => {
      //do something here
      // get interest rate
      // data.interestRate
    })
    .then(() => {
      // option 1 : pass the information to the view(handlebars)
      // res.render()
    })

})
