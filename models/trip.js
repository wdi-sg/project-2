const mongoose = require('mongoose');
const Schema = mongoose.Schema

const tripSchema = new Schema ({
  tripName : {
    type : String
  },
  country : {
    type : String
  },
  city : {
    type : String
  },
  dateFrom : {
    type : Date
  },
  dateTo : {
    type : Date
  },
  users : {
    type : Array
  }
})

const Trip = mongoose.model('trip', tripSchema)
module.exports = Trip
