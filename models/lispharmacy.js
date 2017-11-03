const mongoose = require('mongoose')
const Schema = mongoose.Schema

const lisPharmacySchema = new Schema({

  house_blk_no: String,
  road_name: String,
  level: String,
  unit_no: String,
  building_name: String,
  postal_code: String,
  pharmacy_name: String,
  _id: String
})

const LisPharmacy = mongoose.model('LisPharmacy', lisPharmacySchema)

module.exports = LisPharmacy
