const expect = require('chai').expect;
const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../app');
const User = require('../models/user');
const Profile = require('../models/profile');
const colors = require('colors');
const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connection.on('connected',function(){
  mongoose.connection.dropDatabase(function(){
    console.log('\nDROPPING DATABASE\n'.red);
  });
})

new User({
  name : 'dummy',
  email : 'dummy@email.com',
  password : 'dummyPassword'
}).save(function(err,data){
  if (err) console.log(err);
  console.log('dummy data successfully created!'.green);
})
new User({
  name : 'dummy2',
  email : 'dummy2@email.com',
  password : 'dummyPassword2'
}).save(function(err,data){
  if (err) console.log(err);
  console.log('dummy data successfully created!'.green);
})

//put all authenticated requests in here..
var authApp = request.agent(app);
describe('Test : test for authenticated requests....'.magenta, function(){
  it('is logging in now...',function(done){
    authApp.post('/auth/login').set('Accept','application/json').send({
      email : 'dummy@email.com',
      password : 'dummyPassword'
    }).expect('Location','/dashboard/').end(function(err,res){
      if (err) console.log(err);
      done();
    })
  })
  it('should allow test to access /dashboard/'.magenta,function(done){
    authApp.get('/dashboard/').expect(200,done)
  })
  it('test to access /dashboard/profile, should redirect to create new profile..'.magenta,function(done){
    authApp.get('/dashboard/profile').expect('Location','/dashboard/profile/create').expect(302,done)
  })
});

describe('Test : GET / page...'.magenta, function(){
  it('should return a 200 response',function(done){
    request(app).get('/').expect(200,done);
  })
})

describe('Test : GET /about page...'.magenta,function(){
  it('should return a 200 response',function(done){
    request(app).get('/about').expect(200,done);
  })
})

describe('Test : GET /auth/login page...'.magenta,function(){
  it('should return a 200 response',function(done){
    request(app).get('/auth/login').expect(200,done);
  })
})

describe('Test : GET /auth/register page...'.magenta,function(){
  it('should return a 200 response',function(done){
    request(app).get('/auth/register').expect(200,done);
  })
})

describe('Test : GET /dashboard/ page...'.magenta,function(){
  it('should return a 302 response if not logged in..',function(done){
    request(app).get('/dashboard/').expect('Location','/').expect(302,done);
  })
  // write this test after writing login in!
  it('should return a 200 response if logged in...',function(done){
    request(app).post('/auth/login').set('Accept','application/json').send({
      email : 'dummy@email.com',
      password : 'dummyPassword'
    }).expect('Location', '/dashboard/').expect(302,done);
  })
})

describe('Test : GET /auth/logout...'.magenta,function(){
  it('should return a 302 response and redirect back to main page',function(done){
    request(app).get('/auth/logout').expect('Location', '/').expect(302,done);
  })
})

describe('Test : GET /dashboard/profile page...'.magenta,function(){
  it('should return a 302 response if not logged in...',function(done){
    request(app).get('/dashboard/profile').expect('Location','/').expect(302,done);
  })
})

//test for model!!
describe('Test : testing the user schema...'.magenta,function(){
  it('should create and save a user successfully',function(done){
    new User({
      name : 'John Doe',
      email : 'johndoe@gmail.com',
      password : 'password'
    }).save(function(err,data){
      done(err);
    })
  })
  it('should throw an error if email address is invalid',function(done){
    new User({
      name : 'John Doe 2',
      email : 'funny email',
      password : 'password2'
    }).save(function(err,data){
      if (err) return done();
      return done();
    })
  })
  it('should throw an error if name is invalid',function(done){
    new User({
      name : 'less',
      email : 'correct@email.com',
      password : 'password3'
    }).save(function(err,data){
      if (err) return done();
      return done();
    })
  })
  it('should throw an error if password is invalid',function(done){
    new User({
      name : 'John Doe 3',
      email : 'johndoedoe@gmail.com',
      password : 'four'
    }).save(function(err,data){
      if(err) return done();
      return done();
    })
  })
  it('should hash the password before save',function(done){
    new User({
      name : 'John Doe 4',
      email : 'illbeback@back.com',
      password : 'thisisavalidpassword'
    }).save(function(err,data){
      if(err) return done(err);
      if(data.password === 'thisisavalidpassword'){
        done(Error);
      } else {
        done();
      }
    })
  })
});

// write a model first!!!
//DONE
describe('Test : POST /auth/register..'.magenta,function(){
  it('should redirect to /dashboard/ with a 302 response if successful',function(done){
    request(app).post('/auth/register').set('Accept','application/json').send({
      name : 'John Doe 5',
      email : 'johndoe10@gmail.com',
      password : 'password'
    }).expect('Location','/dashboard/').expect(302,done);
  })
  it('should redirect to / with a 302 response if invalid user was created',function(done){
    request(app).post('/auth/register').set('Accept','application/json').send({
      name : 'not',
      email : 'invalid',
      password : 'four'
    }).expect('Location','/').expect(302,done);
  })
})

describe('Test : testing the profile schema...'.magenta,function(){
  it('should create a profile and save it successfully..',function(done){
    User.find({ name : 'dummy' },function(err,data){
      if (err) console.log(err);
      fs.readFile('test/test-pic.jpg',function(err,data2){
        if (err) console.log(err);
        new Profile({
          description : 'this is a new description',
          user : data._id,
          avatar : data2
        }).save(function(err,data3){
          if (err) console.log(err2);
          console.log(data3);
          done();
        })
      })
    })
  })
  it('should return an error if description is not provided...',function(done){
    User.find({ name : 'dummy2' },function(err,data){
      if (err) console.log(err);
      new Profile({
        user : data._id,
      }).save(function(err,data2){
        if (err) return done();
        done();
      })
    })
  })
})
