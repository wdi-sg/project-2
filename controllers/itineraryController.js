const Itinerary = require('../models/itinerary')

exports.create = (req,res) => {
  // console.log(req.body)
  req.checkBody('dateTimeInput', 'Date cannot be empty').notEmpty()
  req.checkBody('locationsSelect', 'Location cannot be empty').notEmpty()
  let errors = req.validationErrors()
  // console.log(errors)
  if (errors) {
    let msg = errorsString(req.validationErrors())
    req.flash('error', msg)
    res.redirect(req.headers.referer)
  }
  else {
    Itinerary.create({
      date: req.body.dateTimeInput,
      locationName: req.body.locationsSelect,
      remarks: req.body.remarksTextArea,
      tripId: req.body.tripId2
    }, (err, itinerary) => {
      if (err) {
        console.log(err)
        req.flash('error', 'Itinerary not created')
        res.redirect(req.headers.referer)
      } else {
        req.flash('success', 'Itinerary created')
        res.redirect(req.headers.referer)
      }
    }) //end err
  } //end else
}

exports.delete = (req,res) => {
  if (req.body.itineraryId != null) {
    Itinerary.findByIdAndRemove(req.body.itineraryId, err => {
      if (err) {
        console.log(err)
        req.flash('error', 'Error removing Itinerary Entry')
        res.redirect(req.headers.referer)
      } else {
        req.flash('success', 'Itinerary entry removed')
        res.redirect(req.headers.referer)
      }
    })
  } else {
    req.flash('error', 'Error removing Itinerary Entry')
    res.redirect(req.headers.referer)
  }
}

function errorsString(err) {
  let msg = ''
  for (obj of err) {
    msg += obj.msg + '. '
  }
  return msg
}
