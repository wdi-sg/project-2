/*global describe, it*/
const expect = require('chai').expect
const app = require('../app')
const request = require('supertest')
const agent = request.agent(app)
const Playlist = require('../models/playlist')
const User = require('../models/user')
require('colors')

// DUMMY DATA
let playlist1 = {
  name: 'My Test Playlist',
  creator: '',
  collaborators: [],
  tracks: []
}
let playlist2 = {
  name: 'My POSTING Test Playlist',
  creator: '',
  collaborators: [],
  tracks: []
}
let track1 = {
  title: 'Living on a Prayer',
  artist: 'Bon Jovi'
}

// TESTS
describe('ACCESSING PAGES/CLEARING DB'.underline, () => {
  it('should redirect to /profile on successful login'.bold, (done) => {
    agent.post('/users/login')
      .send({email: 'a@b.com', password: 'tomato'})
      .expect('Location','/profile', done)
  })

  it('should destroy all playlists/tracks and redirect to / on get to /playlists/destroyall (TEST ENVIRONMENT ONLY)'.bold, (done) => {
    agent.get('/playlists/destroyall')
      .expect('Location', '/')
      .end((err) => {
        if (err) return console.log(err.toString().red)
        Playlist.find({}, (err, docs) => {
          if (err) return console.log(err.toString().red)
          expect(docs).to.be.empty
          done()
        })
      })
  })

  it('should get 200 from the playlists page'.bold, (done) => {
    agent.get('/playlists')
      .expect(200, done)
  })

  it('should get 200 from the playlists/create page'.bold, (done) => {
    agent.get('/playlists/create')
      .expect(200, done)
  })
})

describe('WRITING PLAYLISTS AND TRACKS TO DATABASE'.underline, () => {
  it('should create a playlist with name and referenced creator'.bold, (done) => {
    User.findOne({}, (err, doc) => {
      if (err) return console.log(err.toString().red)
      playlist1.creator = doc._id
      playlist1.collaborators.push(doc._id)
      track1.contributor = doc._id
      Playlist.create(playlist1, (err, doc) => {
        if (err) return console.log('error'.red)
        expect(doc).to.have.property('_id')
        expect(doc).to.have.property('name')
        expect(doc).to.have.property('creator').that.is.a.string
        expect(doc).to.have.property('collaborators').that.is.an.array
        expect(doc).to.have.property('collaborators').that.has.length(1)
        done()
      })
    })
  })

  it('should be able to push a track into the playlist'.bold,(done) => {
    Playlist.findOne({}, (err, playlist) => {
      if (err) return console.log(err.toString().red)
      playlist.tracks.push(track1)
      playlist.save((err, updated) => {
        if (err) return console.log(err.toString().red)
        expect(updated.tracks).to.have.length.of(1)
        expect(updated.tracks[0]).to.be.an.object
        expect(updated.tracks[0]).to.be.have.property('title').that.equals('Living on a Prayer')
        expect(updated.tracks[0]).to.be.have.property('artist').that.equals('Bon Jovi')
        expect(updated.tracks[0]).to.be.have.property('_id')
        done()
      })
    })
  })
})

describe('FINDING AND POPULATING ITEMS FROM DATABASE'.underline, () => {
  it('should be able to be populate the creator item'.bold, (done) => {
    Playlist.findOne()
      .populate('creator')
      .exec((err, doc) => {
        if (err) return console.log(err.toString().red)
        expect(doc.creator).to.be.an.object
        expect(doc.creator).to.have.property('_id')
        expect(doc.creator).to.have.property('name')
        expect(doc.creator).to.have.property('password')
        done()
      })
  })

  it('should be able to populate the collaborators property'.bold, (done) => {
    Playlist.findOne()
      .populate({
        path: 'collaborators',
        model: 'User'
      })
      .exec((err, doc) => {
        if (err) return console.log(err)
        expect(doc.collaborators).to.be.an.array
        expect(doc.collaborators).to.not.be.empty
        expect(doc.collaborators[0]).to.be.an.object
        expect(doc.collaborators[0]).to.have.property('name')
        expect(doc.collaborators[0]).to.have.property('password')
        expect(doc.collaborators[0]).to.have.property('email')
        done()
      })
  })
})

describe('ACCESSING/MANIPULATING PLAYLISTS WITH HTTP REQUESTS'.underline, () => {
  let playlistId = ''
  let trackId = ''

  it('should be able to create a playlist with a post request to /playlists/create'.bold, (done) => {
    agent.post('/playlists/create')
      .send(playlist2)
      .end((err) => {
        if (err) return console.log(err.toString().red)
        Playlist.findOne({name:playlist2.name}, (err, doc) => {
          playlistId = doc._id
          expect(doc).to.exist
          done()
        })
      })
  })

  it('should redirect to /playlists on receiving a bad playlist id'.bold, (done) => {
    agent.get('/playlists/potato')
      .expect('Location', '/playlists', done)
  })

  it('should add a track to a playlist at /playlists/:id/add'.bold, (done) => {
    agent.post('/playlists/'+playlistId+'/add')
      .send(track1)
      .end((err) => {
        if (err) return console.log(err)
        Playlist.findById(playlistId, (err, doc) => {
          if (err) return console.log(err)
          trackId = doc.tracks[0]._id
          expect(doc.tracks).to.have.length(1)
          done()
        })
      })
  })

  it('should delete a track at /playlists/:playlistid/delete/:trackid'.bold, (done) => {
    agent.get('/playlists/'+playlistId+'/delete/'+trackId)
      .end((err) => {
        if (err) return console.log(err)
        Playlist.findById(playlistId, (err, doc) => {
          if (err) return console.log(err)
          expect(doc.tracks).to.be.an.array
          expect(doc.tracks).to.have.length(0)
          done()
        })
      })
  })

  it('should redirect to /playlists/playlistId on deleting a bad track id'.bold, (done) => {
    agent.get('/playlists/'+playlistId+'/delete/potato')
      .expect('Location', '/playlists/'+playlistId, done)
  })

  it('should delete a playlist at /playlists/:playlistid/delete'.bold, (done) => {
    agent.get('/playlists/'+playlistId+'/delete')
      .end((err) => {
        if (err) return console.log(err)
        Playlist.findById(playlistId, (err, doc) => {
          if (err) return console.log(err)
          expect(doc).to.not.exist
          done()
        })
      })
  })
})