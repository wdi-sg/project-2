/*global describe, it*/
const expect = require('chai').expect
const app = require('../app')
const request = require('supertest')
const agent = request.agent(app)
const User = require('../models/user')
const Playlist = require('../models/playlist')
require('colors')

const jstring = (input) => console.log(JSON.stringify(input, null, 4).blue)

describe('LIKING PLAYLISTS'.underline, () => {
  let playlistId = ''
  let userId = ''

  it('should log in'.bold, (done) => {
    agent.post('/users/login')
      .send({email:'a@b.com', password:'tomato'})
      .expect('Location', '/profile', done)
  })

  it('should have a list of favorite playlists on the User item'.bold, (done) => {
    User.findOne({email: 'a@b.com'}, (err, doc) => {
      if (err) return console.log(err)
      jstring(doc)
      userId = doc._id
      expect(doc).to.have.property('likedPlaylists')
      expect(doc.likedPlaylists).to.be.an.array
      done()
    })
  })

  it('should add a playlist to the list on GET /playlists/id/like'.bold, (done) => {
    Playlist.findOne({}, (err, doc) => {
      if (err) return console.log(err)
      playlistId = doc._id
    })
    agent.get('/playlists/'+playlistId+'/like')
      .end((err) => {
        if (err) return console.log(err)
        User.findById(userId, (err, doc) => {
          expect(doc).to.have.property('likedPlaylists')
          expect(doc.likedPlaylists).to.be.an.array
          expect(doc.likedPlaylists).to.be.length(1)
          done()
        })
      })
  })

  it('should be a populated list'.bold, (done) => {
    User.findOne({}, (err, doc) => {
      if (err) return console.log(err)
      jstring(doc.likedPlaylists)
      expect(doc.likedPlaylists[0]).to.be.an.object
      expect(doc.likedPlaylists[0]).to.be.have.property('tracks')
      done()
    })
  })
})