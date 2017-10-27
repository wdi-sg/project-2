$(function () {
  // Browse search bar function
  $('#search-form').submit(function (event) {
    event.preventDefault()
    var input = $('#query')
    var ulBookDisplay = $('#ulBookDisplay')
    var userQuery = input.val()
    userQuery = userQuery.toLowerCase().split(' ').join('+')
    console.log('user query: ' + userQuery)
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
        // $anchor.attr('href', '/browse/' + book.id)
        $anchor.attr('href', book.volumeInfo.canonicalVolumeLink)
        var $img = $('<img>')
        $img.attr('src', book.volumeInfo.imageLinks.thumbnail)
        $anchor.append($img)
        $newList.append($anchor)

      // read btn
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
  })

// readBtn function
  $('#ulBookDisplay').on('click', '.readBtn', function () {
    var bookTitle = $(this).parent().find('h4').text()
    var bookAuthor = $(this).parent().find('h6').text()
    var json = JSON.stringify({
      bookTitle,
      bookAuthor
    })
    fetch('/book', {
      credentials: 'include',
      method: 'POST',
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(message => {
      console.log(message)
    })

    // get the book id ?? but i havent created the book item
      // create the book into the db
    // push the book id to the user.readBooks array
    // which user? the one in the current session
    // after i push the book id? ??????
  })
})
