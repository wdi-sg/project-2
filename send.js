require('dotenv').config({ silent: true })

const sgMail = require('@sendgrid/mail')
const User = require('./models/user')
const dbUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project-2'
const mongoose = require('mongoose')
const { findCurrentQuote } = require('./helpers')

mongoose.Promise = global.Promise
mongoose.connect(dbUrl, { useMongoClient: true })
.then(() => { console.log('db is connected') },
err => console.log(err))

User.find({
  subscribeQuote: true
})
.then((subscribers) => {
  subscribers.forEach((subscriber) => {
    findCurrentQuote()
    .then(dailyQuote => {
      sgMail.setApiKey(process.env.API_KEY)
      const msg = {
        to: subscriber.email,
        from: 'matthewfoys@gmail.com',
        subject: `Good Morning ${subscriber.name}! Here is your morning quote`,
        text: `Morning ${subscriber.name} - Daily Quote`,
        html: `<strong>Blessed morning ${subscriber.name}!<br/>
        Your Daily Quote: ${dailyQuote.quote} <br/>
        Author: ${dailyQuote.author} <br/>
        </strong>`
      }
      sgMail.send(msg)
      .then(output => console.log('success'))
      .catch(err => console.log(err))
      // console.log('daily quotes', dailyQuote)
    })
    // console.log('Each Subscriber', subscriber)
  })
})
