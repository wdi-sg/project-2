//testing timestamps...
const mongoose = require('mongoose');
mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost/second-project-test-time',function(){
//   console.log('connected to db..');
// })

const timeSchema = new mongoose.Schema({
  something : Number,
}, {timestamps : true})

const testTime = mongoose.model('Time', timeSchema);
var instanceTime = new testTime({
  something : 4,
})

instanceTime.save();
