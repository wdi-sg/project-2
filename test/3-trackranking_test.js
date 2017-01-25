/*global describe, it*/
const expect = require('chai').expect
const app = require('../app')
const request = require('supertest')
const agent = request.agent(app)
const Playlist = require('../models/playlist')
require('colors')

const jstring = (input) => console.log(JSON.stringify(input, null, 2).blue)

const playlist1 = {
  name:'ranking test',
  creator: 'agent orange',
  collaborators: ['agent orange'],
  tracks:[]
}
const track1 = {
  title:'a good song',
  artist:'a good band',
  contributor: 'agent orange'
}
const track2= {
  title:'a great song',
  artist:'a great band',
  contributor: 'agent orange'
}
const track3 = {
  title:'the best song',
  artist:'the best band',
  contributor: 'agent orange'
}

describe('TRACK RANKING SYSTEM'.underline, () => {
  let playlistId = ''
  let track1Id = ''
  let track3Id = ''
  it('should return all playlists with populated tracks'.bold, (done) => {
    Playlist.find({}, (err, docs) => {
      if (err) return console.log(err)
      expect(docs).to.be.an.array
      expect(docs).to.not.be.empty
      expect(docs[0].tracks).to.be.an.array
      expect(docs[0].tracks[0]).to.be.an.object
      expect(docs[0].tracks[0]).to.be.have.property('title')
      done()
    })
  })

  it('should log in'.bold, (done) => {
    agent.post('/users/login')
      .send({email:'a@b.com', password:'tomato'})
      .expect('Location', '/profile', done)
  })

  it('should create and return a playlist with populated tracks'.bold, (done) => {
    Playlist.create(playlist1, (err, doc) => {
      if (err) return console.log(err)
      doc.tracks.push(track1)
      doc.tracks.push(track2)
      doc.tracks.push(track3)
      doc.save((err, saved) => {
        if (err) return console.log(err)
        // jstring(saved)
        playlistId = doc._id
        track1Id = doc.tracks[0]._id
        track3Id = doc.tracks[2]._id
        expect(saved.tracks).to.have.length(3)
        done()
      })
    })
  })

  it('should increase the rank of a track at /playlists/playlistId/up/trackId and redirect to /playlists/playlistId'.bold, (done) => {
    agent.get('/playlists/'+playlistId+'/up/'+track3Id)
      .expect('Location', '/playlists/'+playlistId)
      .end((err) => {
        if (err) return console.log(err)
        Playlist.findById(playlistId, (err, doc) => {
          if (err) return console.log(err)
          expect(doc.tracks[2].rank).to.equal(1)
          done()
        })
      })
  })

  it('should decrease the rank of a track at /playlists/playlistId/up/trackId and redirect to /playlists/playlistId'.bold, (done) => {
    agent.get('/playlists/'+playlistId+'/down/'+track1Id)
      .expect('Location', '/playlists/'+playlistId)
      .end((err) => {
        if (err) return console.log(err)
        Playlist.findById(playlistId, (err, doc) => {
          if (err) return console.log(err)
          expect(doc.tracks[0].rank).to.equal(-1)
          done()
        })
      })
  })
})