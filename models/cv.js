const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const cvSchema = new Schema({
  execSummary: [ { type: String } ],
  keyComp: [ { type: String } ],
  profExp: [ {
    company: { type: String },
    duration: { type: String },
    responsibilities: [ { type: String } ]
  } ],
  edu: [ {
    school: { type: String },
    duration: { type: String },
    qualification: { type: String }
  } ],
  actAndAch: [ { type: String } ],
  skillsAndInt: [ { type: String } ],
  lang: [ { type: String } ]
})

const CV = mongoose.model('CV', cvSchema)

module.exports = CV
