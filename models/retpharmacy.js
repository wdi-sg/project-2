const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RetPharmacySchema = new Schema({
_id : String,
X : String,
Y : String,
Name : String,
ADDRESSFLOORNUMBER : String,
DESCRIPTION : String,
ADDRESSPOSTALCODE : String,
ADDRESSSTREETNAME : String,
ADDRESSUNITNUMBER : String,
ADDRESSBLOCKHOUSENUMBER : String
})

const RetPharmacy = mongoose.model('RetPharmacy', RetPharmacySchema)

module.exports = RetPharmacy
