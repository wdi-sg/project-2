
function testEmailSend () {
  require('dotenv').config({ silent: true })
  const sgMail = require('@sendgrid/mail')
  const User = require('./models/user')
  const dbUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project-2'
  const mongoose = require('mongoose')
  const { findCurrentQuote } = require('./helpers')

  mongoose.Promise = global.Promise
  mongoose.connect(dbUrl, { useMongoClient: true })
  .then(() => {
    sendEmail()
    console.log('db is connected')
  },
  err => console.log(err))

  function sendEmail () {
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
            html: `<strong>
            Your Daily Quote: ${dailyQuote.quote} <br/>
            Author: ${dailyQuote.author} <br/>
            </strong>`
          }
          sgMail.send(msg)
          .then(output => console.log('success'))
          .catch(err => console.log(err))
        })
      })
    })
  }
}

testEmailSend()
