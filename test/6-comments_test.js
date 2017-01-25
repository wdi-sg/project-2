/*global describe, it*/
const expect = require('chai').expect
const app = require('../app')
const request = require('supertest')
const agent = request.agent(app)
const Playlist = require('../models/playlist')
require('colors')

// const jstring = (input) => console.log(JSON.stringify(input, null, 4).blue)

describe('COMMENTS'.underline, () => {
  let playlistId = ''

  it('should log in'.bold, (done) => {
    agent.post('/users/login')
      .send({email:'a@b.com', password:'tomato'})
      .expect('Location', '/profile', done)
  })

  it('should have a comments property in playlists', (done) => {
    Playlist.findOne({}, (err, doc) => {
      playlistId = doc._id
      expect(doc).to.have.property('comments')
      expect(doc.comments).to.be.an.array
      done()
    })
  })

  it('should add a comment from /playlists/playlistid/comment'.bold, (done) => {
    agent.post('/playlists/'+playlistId+'/comment')
      .send({
        comment: 'first test comment'
      })
      .expect('Location', '/playlists/'+playlistId)
      .end((err) => {
        if (err) return console.log(err)
        Playlist.findById(playlistId, (err, doc) => {
          if (err) return console.log(err)
          expect(doc.comments).to.have.length(1)
          done()
        })
      })
  })

  it('should save comment author'.bold, (done) => {
    Playlist.findById(playlistId, (err, doc) => {
      expect(doc.comments[0].author).to.equal('Test Saregreat')
      done()
    })
  })
})