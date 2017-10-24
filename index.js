const express = require('express')
const mongoose = require('mongoose');
const app = express()


const dbUrl = process.env.MONGODB_URI === 'production' ? process.env.MONGODB_URI : "mongodb://localhost/project2"
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send("Connected")
})

// connectin to mongodb
mongoose.Promise = global.Promise

mongoose.connect(dbUrl, {
  useMongoClient: true
})
.then(
  () => { console.log('db is connected :P') },
  (err) => { console.log(err) }
)

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})
