/*global describe, it*/
const expect = require('chai').expect
const app = require('../app')
const request = require('supertest')
const agent = request.agent(app)
const User = require('../models/user')
const Playlist = require('../models/playlist')
require('colors')

// const jstring = (input) => console.log(JSON.stringify(input, null, 4).blue)

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
      // jstring(doc)
      userId = doc._id
      expect(doc).to.have.property('likedPlaylists')
      expect(doc.likedPlaylists).to.be.an.array
      done()
    })
  })

  it('should redirect to the playlist on GET /playlists/id/like'.bold, (done) => {
    Playlist.findOne({}, (err, doc) => {
      if (err) return console.log(err)
      // jstring(doc)
      playlistId = doc._id
      agent.get('/playlists/'+playlistId+'/like')
        .expect('Location', '/playlists/'+playlistId, done)
    })
  })

  it('should add a playlist to the list of liked playlists'.bold, (done) => {
    User.findById(userId, (err, doc) => {
      expect(doc.likedPlaylists).to.be.an.array
      expect(doc.likedPlaylists).to.be.have.length(1)
      done()
    })
  })

  it('should be able to be fully populated (tracks, creator name, collaborators)'.bold, (done) => {
    User.findOne({})
    .populate({
      path: 'likedPlaylists',
      model: 'Playlist',
      populate: {
        path: 'creator',
        model: 'User'
      }
    })
    .populate({
      path: 'likedPlaylists',
      model: 'Playlist',
      populate: {
        path: 'collaborators',
        model: 'User'
      }
    })
    .exec((err, doc) => {
      if (err) return console.log(err)
      // jstring(doc)
      expect(doc.likedPlaylists[0]).to.be.an.object
      expect(doc.likedPlaylists[0]).to.be.have.property('tracks')
      expect(doc.likedPlaylists[0]).to.be.have.property('creator')
      expect(doc.likedPlaylists[0]).to.be.have.property('collaborators')
      expect(doc.likedPlaylists[0].creator).to.be.an.object
      expect(doc.likedPlaylists[0].creator).to.be.have.property('name')
      expect(doc.likedPlaylists[0].collaborators[0]).to.be.an.object
      expect(doc.likedPlaylists[0].collaborators[0]).to.be.have.property('name')
      done()
    })
  })

  it('should redirect to the playlist on GET /playlists/id/unlike'.bold, (done) => {
    Playlist.findOne({}, (err, doc) => {
      if (err) return console.log(err)
      // jstring(doc)
      playlistId = doc._id
      agent.get('/playlists/'+playlistId+'/unlike')
        .expect('Location', '/playlists/'+playlistId, done)
    })
  })

  it('should remove a playlist from the list of liked playlists'.bold, (done) => {
    User.findById(userId, (err, doc) => {
      // jstring(doc)
      expect(doc.likedPlaylists).to.be.an.array
      expect(doc.likedPlaylists).to.be.have.length(0)
      done()
    })
  })
})