const FixedDeposit = require('../models/fixed-deposit')
const express = require('express')
const router = express.Router()

router.get('/fixed-deposit', (req, res) => {
  FixedDeposit.find()
  .then((fixedDeposits) => {
    res.send(fixedDeposits)
  })
})

// res.render('/bank-account/fixed-deposit')


// router.post('/', (req, res) => {
//   var formData = req.body
//   var newFixedDeposit = new fixedDeposit({
//     name: formData.name,
//     bank_img: formData.bank,
//     // annual_interest_rate: {
//     //   "1 month": formData.one_month,
//     //   "2 month": formData.two_month,
//     //   "3 month": formData.three_month,
//     //   "4 month": formData.four_month,
//     //   "5 month": formData.five_month,
//     //   "6 month": formData.six_month,
//     //   "7 month": formData.seven_month,
//     //   "8 month": formData.eight_month,
//     //   "9 month": formData.nine_month,
//     //   "10 month": formData.ten_month,
//     //   "11 month": formData.eleven_month,
//     //   "12 month": formData.twelve_month,
//     //   "18 month": formData.eighteen_month,
//     //   "24 month": formData.twentyfour_month,
//     //   "36 month": formData.thirtysix_month,
//     //   "48 month": formData.fortyeight_month,
//     //   "60 month": formData.sixty_month
//     // },
//     minimum_age: formData.min_age,
//     minimum_deposit: formData.min_deposit,
//     fees_charges: formData.fees_charges,
//     link: formData.link
//   })

  router.post('/fixed-deposit', (req, res) => {
    let fixedDeposits = fs.readFileSync('./data.json');
    fixedDeposits = JSON.parse(fixedDeposits);

    fixedDeposits.push(req.body);

    fs.writeFileSync('./data.json', JSON.stringify(fixedDeposits));
    res.redirect('/fixed-deposit')
  })

//   newFixedDeposit.save()
//   .then(
//     user => res.redirect(`/`),
//     err => res.send(err)
//   )
// })

module.exports = router
