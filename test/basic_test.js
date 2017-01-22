/*global describe, it*/
// const expect = require('chai').expect()
const request = require('supertest')
const app = require('../app')
require('colors')

describe('BASIC TESTS'.underline, () => {
  it('should get a 200 response from /', (done) => {
    request(app).get('/')
      .expect(200, done)
  })
  it('should get redirected from /user to /', (done) => {
    request(app).get('/users')
      .expect(302)
      .expect('Location', '/', done)
  })
})