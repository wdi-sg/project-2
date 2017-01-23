/*global describe, it*/
const expect = require('chai').expect
const app = require('../app')
const request = require('supertest')
const agent = request.agent(app)
// const Track = require('../models/track')
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
let track1 = {
  title: 'Living on a Prayer',
  artist: 'Bon Jovi'
}

// TESTS
describe('CLEARING DB'.underline, () => {
  it('should redirect to /profile on successful login'.bold, (done) => {
    agent.post('/users/login')
      .send({email: 'a@b.com', password: 'tomato'})
      .expect('Location','/profile', done)
  })

  it('should destroy all playlists/tracks and redirect to / on get to /playlists/destroyall'.bold, (done) => {
    agent.get('/playlists/destroyall')
      .expect('Location', '/')
      .end((err) => {
        if (err) return console.log(err)
        Playlist.find({}, (err, docs) => {
          if (err) return console.log(err)
          expect(docs).to.be.empty
          done()
        })
      })
  })
})

describe('WRITING PLAYLISTS AND TRACKS TO DATABASE'.underline, () => {
  it('should create a playlist with name and ref creator'.bold, (done) => {
    User.findOne({}, (err, doc) => {
      if (err) return console.log(err)
      playlist1.creator = doc._id
      playlist1.collaborators.push(doc._id)
      track1.contributor = doc._id
      Playlist.create(playlist1, (err, doc) => {
        if (err) return console.log('error'.red)
        // console.log('playlist created:', doc)
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
      if (err) return console.log(err)
      playlist.tracks.push(track1)
      playlist.save((err, updated) => {
        if (err) return console.log(err)
        // console.log('track pushed:', updated)
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

describe('FINDING AND POPULATING ITEMS'.underline, () => {
  it('should be able to be populate the creator item'.bold, (done) => {
    Playlist.findOne()
      .populate('creator')
      .exec((err, doc) => {
        if (err) return console.log(err)
        // console.log('playlist found:', doc)
        // console.log('playlist creator found:', doc.creator)
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

