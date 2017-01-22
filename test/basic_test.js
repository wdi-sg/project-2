/*global describe, it*/
// const expect = require('chai').expect()
const app = require('../app')
const request = require('supertest')
const server = request.agent(app)
require('colors')

describe('BASIC GET TESTS'.underline, () => {
  it('should get a 200 response from /'.bold, (done) => {
    request(app).get('/')
      .expect(200, done)
  })
  it('should redirect from /users to /'.bold, (done) => {
    request(app).get('/users')
      .expect(302)
      .expect('Location', '/', done)
  })
  it('should get a 200 from /users/signup'.bold, (done) => {
    server.get('/users/signup')
      .expect(200, done)
  })
  it('should get a 200 from /users/login'.bold, (done) => {
    server.get('/users/login')
      .expect(200, done)
  })
  it('should redirect /profile to / on attempt to access without login'.bold, (done) => {
    server.get('/profile')
      .expect('Location','/', done)
  })
  it('should destroy everything and redirect to / on get to /users/destroyall'.bold, (done) => {
    request(app).get('/users/destroyall')
      .expect(302)
      .expect('Location', '/', done)
  })
})