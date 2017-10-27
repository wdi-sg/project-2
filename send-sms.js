// Twilio Credentials
const accountSid = 'AC395a60f2115486f9be4b51620f410630';
const authToken = '71ea9251b6445e77133faf438d4f98a3';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    to: '+6582221506',
    from: '+17173882453 ',
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
  })
  .then((message) => console.log(message.sid));
