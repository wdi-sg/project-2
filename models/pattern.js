const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patternSchema = new Schema ({
  title : String,
  date : [Date],
  creator : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  category : String, // considering  array
  difficulty : String,
  estimatedTimeCreator : String,
  estimatedTimeChallengers : {
    beginner : String,
    intermediate : String,
    advance : String
  },
  variation : [],
  material : String,
  steps : String
})
