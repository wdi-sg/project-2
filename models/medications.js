const mongoose = require('mongoose')
const Schema = mongoose.Schema

const medicationSchema = new Schema({
  name: String,
  dosage: String
})

const Medication = mongoose.model('Medication', medicationSchema)

module.exports = Medication
