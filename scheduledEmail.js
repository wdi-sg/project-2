// var CronJob = require('cron').CronJob
// var job = new CronJob('0 0 8 * * *', sendEmail)
// Timing Syntax - Ex. if i put 5 for the 1st asteric, will run on the 5th second out of the 60 seconds.
// minutes. If i put 10. Will run every hour, at the 10th minute.
// I tried running 29 on the minutes. At 29 minuteth, it ran every second on the 29th minuteth. This is because I need to set the seconds as well
// (10 10 22 * * * ) will run at 10pm at the 10th minute, at the 10second.
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
          // console.log('daily quotes', dailyQuote)
        })
        // console.log('Each Subscriber', subscriber)
      })
    })
  }
}

testEmailSend()
