// function sayHello {
//   console.log('say hello');
// }
// sayHello()

function sendEmailOnSchedule () {
  // console.log('hello world')
  require('dotenv').config({ silent: true })
  const sgMail = require('sendgrid')
  // const sgMail = require('@sendgrid/mail')
  const User = require('./models/user')
  const dbUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project-2'
  const mongoose = require('mongoose')
  const { findCurrentQuote } = require('./helpers')

  mongoose.Promise = global.Promise
  mongoose.connect(dbUrl, { useMongoClient: true })
  .then(() => {
    console.log('db is connected')
  },
  err => console.log(err))

  // function sendEmail () {
  User.find({
    subscribeQuote: true
  })
    .then((subscribers) => {
      subscribers.forEach((subscriber) => {
        findCurrentQuote()
        .then(dailyQuote => {
          sgMail.setApiKey(process.env.API_KEY_HEROKU)
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
}
// }
sendEmailOnSchedule()

// var sg = require('sendgrid')(process.env.API_KEY_HEROKU)
// var request = sg.emptyRequest({
//   method: 'POST',
//   path: '/v3/mail/send',
//   body: {
//     personalizations: [
//       {
//         to: [
//           {
//             email: 'test@example.com',
//           },
//         ],
//         subject: 'Hello World from the SendGrid Node.js Library!',
//       },
//     ],
//     from: {
//       email: 'test@example.com',
//     },
//     content: [
//       {
//         type: 'text/plain',
//         value: 'Hello, Email!',
//       },
//     ],
//   },
// });
//
// //With promise
// sg.API(request)
//   .then(response => {
//     console.log(response.statusCode);
//     console.log(response.body);
//     console.log(response.headers);
//   })
//   .catch(error => {
//     //error is an instance of SendGridError
//     //The full response is attached to error.response
//     console.log(error.response.statusCode);
//   });
