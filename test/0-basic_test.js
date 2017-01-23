/*global describe, it*/
require('colors')
const expect = require('chai').expect
const app = require('../app')
const request = require('supertest')
const agent = request.agent(app)
const User = require('../models/user')

describe('BASIC GET TESTS'.underline, () => {
  it('should get a 200 response from /'.bold, (done) => {
    agent.get('/')
      .expect(200, done)
  })
  it('should redirect from /users to /'.bold, (done) => {
    agent.get('/users')
      .expect(302)
      .expect('Location', '/', done)
  })
  it('should get a 200 from /users/signup'.bold, (done) => {
    agent.get('/users/signup')
      .expect(200, done)
  })
  it('should get a 200 from /users/login'.bold, (done) => {
    agent.get('/users/login')
      .expect(200, done)
  })
  it('should redirect /profile to /users/login on attempt to access without login'.bold, (done) => {
    agent.get('/profile')
      .expect('Location','/users/login', done)
  })
  it('should destroy everything and redirect to / on get to /users/destroyall (TEST ENVIRONMENT ONLY)'.bold, (done) => {
    request(app).get('/users/destroyall')
      .expect(302)
      .expect('Location', '/')
      .end(() => {
        User.find({}, (err, docs) => {
          expect(docs).to.be.empty
          done()
        })
      })
  })
})