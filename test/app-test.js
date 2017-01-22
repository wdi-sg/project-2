const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const colors = require('colors');

describe('Test : GET / page...'.magenta, function(){
  it('should return a 200 response',function(done){
    request(app).get('/').expect(200,done);
  })
})

describe('Test : GET /auth/login page...'.magenta,function(){
  it('should return a 200 response',function(done){
    request(app).get('/auth/login').expect(200,done);
  })
})

describe('Test : GET /dashboard/ page...'.magenta,function(){
  it('should return a 200 response',function(done){
    request(app).get('/dashboard/').expect(200,done);
  })
})

describe('Test : GET /auth/register page...'.magenta,function(){
  it('should return a 200 response',function(done){
    request(app).get('/auth/register').expect(200,done);
  })
})

describe('Test : GET /about page...'.magenta,function(){
  it('should return a 200 response',function(done){
    request(app).get('/about').expect(200,done);
  })
})
