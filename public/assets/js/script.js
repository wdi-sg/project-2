$(function () {
// Browse search bar function
  $('#search-form').submit(function (event) {
    event.preventDefault()
    var input = $('#query')
    var ulBookDisplay = $('#ulBookDisplay')
    var userQuery = input.val()
    userQuery = userQuery.toLowerCase().split(' ').join('+')
    ulBookDisplay.empty()
    var getLink = 'https://www.googleapis.com/books/v1/volumes?q=' + userQuery
    $.get(getLink)
    .done(function (response) {
      var book_search = response.items
      // for each book_search
      book_search.forEach(function (book) {
        var $newList = $('<li>')
      // book img + anchor link href to bookdetails
        var $anchor = $('<a>')
        $anchor.attr('href', '/browse/' + book.id)
      // $anchor.attr('href', book.volumeInfo.canonicalVolumeLink)
        var $img = $('<img>')
        $img.attr('src', book.volumeInfo.imageLinks.thumbnail)
        $anchor.append($img)
        $newList.append($anchor)
      // read btn
        var $btn = $('<button class="moreInfo" name="' + book.id + '">More info.</button>')
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
  })

// More Info btn functions
  $('#ulBookDisplay').on('click', '.moreInfo', function () {
    var ulBookDisplay = $('#ulBookDisplay')
    ulBookDisplay.empty()
    var getLink = 'https://www.googleapis.com/books/v1/volumes/' + this.name
    $.get(getLink)
    .done(function (response) {
      // save book details to DB
      var bookTitle = response.volumeInfo.title
      var bookAuthor = response.volumeInfo.authors
      var bookDescription = response.volumeInfo.description
      var json = JSON.stringify({
        bookTitle,
        bookAuthor,
        bookDescription
      })
      fetch('/saveBook', {
        credentials: 'include',
        method: 'POST',
        body: json,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // DOM manipulation to show book details
      var $newList = $('<li>')

      var $img = $('<img>')
      $img.attr('src', response.volumeInfo.imageLinks.small)
      $img.attr('name', response.id)
      $newList.append($img)

      var $title = $('<h3>')
      $title.text(bookTitle)
      $newList.append($title)

      var $author = $('<h4>')
      $author.text('Author: ' + bookAuthor)
      $newList.append($author)

      var $publisher = $('<h6>')
      $publisher.text('Publisher: ' + response.volumeInfo.publisher)
      $newList.append($publisher)

      var $publishedDate = $('<h6>')
      $publishedDate.text('Published Date: ' + response.volumeInfo.publishedDate)
      $newList.append($publishedDate)

      var $description = $('<p class="desc">')
      $description.text(bookDescription)
      $newList.append($description)

      var $btn = $('<button>')
      $btn.attr('class', 'readBtn')
      $btn.html('I have read this!')

      fetch('/createBtn', {
        credentials: 'include',
        method: 'POST',
        body: json,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        var message = response.json()
        console.log(message)
        if (message) {
          $btn.attr('class', 'unreadBtn')
          $btn.html('Unread Book')
        }
      })
      $newList.append($btn)
      ulBookDisplay.append($newList)
    })
  })

// readBtn function
  $('#ulBookDisplay').on('click', '.readBtn', function () {
    var bookTitle = $(this).parent().find('h3').text()
    var bookAuthor = $(this).parent().find('h4').text()
    var bookDescription = $(this).parent().find('p').text()
    // var bookApiId = $(this).parent().find('img').
    // console.log('bookAPI_ID: ', bookApiId)
    var json = JSON.stringify({
      bookTitle,
      bookAuthor,
      bookDescription
    })
    fetch('/addReadBook', {
      credentials: 'include',
      method: 'POST',
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(message => {
      console.log(message.readBooks)
    })
  })

// Unread btn on click Function
  $('#ulBookDisplay').on('click', '.unreadBtn', function () {
    var bookTitle = $(this).parent().find('h3').text()
    var bookAuthor = $(this).parent().find('h4').text()
    var bookDescription = $(this).parent().find('p').text()
    // var bookApiId = $(this).parent().find('img').
    // console.log('bookAPI_ID: ', bookApiId)
    var json = JSON.stringify({
      bookTitle,
      bookAuthor,
      bookDescription
    })
    fetch('/removeReadBook', {
      credentials: 'include',
      method: 'POST',
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })
})
