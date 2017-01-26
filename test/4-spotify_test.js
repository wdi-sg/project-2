// /*global describe, it*/
// const expect = require('chai').expect
// const app = require('../app')
// const request = require('supertest')
// const agent = request.agent(app)
// require('colors')

// const jstring = (input) => console.log(JSON.stringify(input, null, 4).blue)

// describe('SPOTIFY'.underline, () => {
//   it('should get a response from the spotify api'.bold, (done) => {
//     // request('https://api.spotify.com/v1/search?q=Muse&type=track,artist&market=US').get()
//     agent.get('https://api.spotify.com/v1/search?q=Muse&type=track,artist&market=US')
//       .expect(200)
//       .end((err, res) => {
//         jstring(res)
//         expect(res).to.be.an.object
//         done()
//       })
//   })
// })