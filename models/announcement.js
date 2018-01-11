const mongoose = require('mongoose')
const Schema = mongoose.Schema
const moment = require('moment')

let announceDate = new Date()
let fromAnnounceDate = moment(announceDate).format('MMMM Do YYYY, h:mm:ss a')

const announcementSchema = new Schema({
  content : {
    type: String,
  },
  postedBy : {
      type : String,
  },
  datePosted : {
    type : String,
    default: fromAnnounceDate
  }
})

const Announcement = mongoose.model('Announcement', announcementSchema)
module.exports = Announcement
