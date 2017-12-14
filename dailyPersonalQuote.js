function testEmailSend () {
  require('dotenv').config({ silent: true })
  const sgMail = require('@sendgrid/mail')
  const dbUrl = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project-2'
  const mongoose = require('mongoose')

  mongoose.Promise = global.Promise
  mongoose.connect(dbUrl, { useMongoClient: true })
  .then(() => {
    sendEmail()
    console.log('db is connected')
  },
  err => console.log(err))

  function sendEmail () {
    sgMail.setApiKey(process.env.API_KEY)
    const msg = {
      to: 'matthewfoys@gmail.com',
      from: 'matthewfoys@gmail.com',
      subject: `Good Morning Matthew! Here is your morning quote`,
      text: `Morning Matthew! - Daily Quote`,
      html: `<strong>
                    Your Daily Quote: I am a charismatic empathetic gentleman that has a powerful mind
                    for problem solving. I refuse to give up and I am relentless.
                    </strong>`
    }
    sgMail.send(msg)
                  .then(output => console.log('success'))
                  .catch(err => console.log(err))
  }
}

testEmailSend()
