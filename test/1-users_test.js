/*global describe, it*/
const expect = require('chai').expect
const app = require('../app')
const request = require('supertest')
const agent = request.agent(app)
const User = require('../models/user')
require('colors')

// DEFINE DUMMY USERS
const testUser1 = {
  email: 'a@b.com',
  name: 'Boy',
  password: 'tomato'
}
const testUser2 = {
  email: 'potato',
  name: 'Boy',
  passsword: 'potato'
}
const testUser3 = {
  email: 'b@c.com',
  name: 'Boy',
  password: 'abc'
}
const testUser4 = {
  email: 'b@c.com',
  password: 'abc'
}

// TESTS
describe('USER SIGNUP'.underline, () => {
  it('should redirect to /users/login on successful signup at /users/signup'.bold, (done) => {
    agent.post('/users/signup')
      .send(testUser1)
      .expect('Location', '/users/login', done)
  })
  it('should only store the hashed password in the database'.bold, (done) => {
    User.findOne({email:'a@b.com'}, (err, user) => {
      if (err) return console.log(err)
      expect(user.password).to.not.equal('tomato')
      done()
    })
  })
  it('should redirect to /users/signup on unsuccessful signup (email already taken)'.bold, (done) => {
    agent.post('/users/signup')
      .send(testUser1)
      .expect('Location', '/users/signup', done)
  })
  it('should redirect to /users/signup on unsuccessful signup (email format invalid)'.bold, (done) => {
    agent.post('/users/signup')
      .send(testUser2)
      .expect('Location', '/users/signup', done)
  })
  it('should redirect to /users/signup on unsuccessful signup (password below 5 chars)'.bold, (done) => {
    agent.post('/users/signup')
      .send(testUser3)
      .expect('Location', '/users/signup', done)
  })
  it('should redirect to /users/signup on unsuccessful signup (no name provided)'.bold, (done) => {
    agent.post('/users/signup')
      .send(testUser4)
      .expect('Location', '/users/signup', done)
  })
})

describe('USER LOGIN'.underline, () => {
  it('should redirect to /user/login on unsuccessful login (unregistered email)'.bold, (done) => {
    agent.post('/users/login')
      .send({email: 'a@f.com', password: 'potato'})
      .expect('Location','/users/login', done)
  })
  it('should redirect to /user/login on unsuccessful login (invalid password)'.bold, (done) => {
    agent.post('/users/login')
      .send({email: 'a@b.com', password: 'potato'})
      .expect('Location','/users/login', done)
  })
  it('should redirect to /profile on successful login'.bold, (done) => {
    agent.post('/users/login')
      .send({email: 'a@b.com', password: 'tomato'})
      .expect('Location','/profile', done)
  })
  it('should be able to access /profile after logging in'.bold, (done) => {
    agent.get('/profile')
      .expect(200, done)
  })
})

describe('USER LOGOUT'.underline, () => {
  it('should log the user out and redirect to / on get to /users/logout'.bold, (done) => {
    agent.get('/users/logout')
      .expect('Location', '/', done)
  })
  it('should not be able to access /profile after logging out'.bold, (done) => {
    agent.get('/profile')
      .expect('Location', '/users/login', done)
  })
})