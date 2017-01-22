/*global describe, it*/
// const expect = require('chai').expect()
const request = require('supertest')
const app = require('../app')
require('colors')

describe('BASIC TESTS'.underline, () => {
  it('should get a 200 response from /'.bold, (done) => {
    request(app).get('/')
      .expect(200, done)
  })
  it('should redirect from /users to /'.bold, (done) => {
    request(app).get('/users')
      .expect(302)
      .expect('Location', '/', done)
  })
  it('should destroy everything and redirect to / on get to /destroyall'.bold, (done) => {
    request(app).get('/destroyall')
      .expect(302)
      .expect('Location', '/', done)
  })
})