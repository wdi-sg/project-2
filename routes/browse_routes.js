const User = require('../models/user')
const express = require('express')
const router = express.Router()
const passport = require('../config/ppConfig')

router.get('/', (req, res) => {
  res.render('browse/search')
})

router.get('/:id', (req, res) => {
  var getLink = 'https://www.googleapis.com/books/v1/volumes/' + req.params.id
  console.log('getLink: '+getLink)

  $.get(getLink)
  .done(function (response) {
    var book = response
    console.log(book)
    book_search.forEach(function (book) {
      var $newList = $('<li>')
    //  $newList.text('Title: ' + book.volumeInfo.title)

    // book img
      var $anchor = $('<a>')
      $anchor.attr('href', '/browse/'+book.id)

      var $img = $('<img>')
      $img.attr('src', book.volumeInfo.imageLinks.thumbnail)

      $anchor.append($img)

      $newList.append($anchor)

      var $btn = $('<button class="readBtn">Read this</button>')
      $newList.append($btn)

    // title
      var $h4 = $('<h4>')
      $h4.text(book.volumeInfo.title)
      $newList.append($h4)

    // author
      var $h6 = $('<h6>')
      $h6.text(book.volumeInfo.authors)
      $newList.append($h6)

      ulBookDisplay.append($newList)
    })
  })

  res.render('browse/bookDetails')
})

module.exports = router
