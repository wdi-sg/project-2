$(function () {
  // Browse Search
  $('#search-form').submit(function (event) {
    event.preventDefault()
    var input = $('#query')
    var ulBookDisplay = $('#ulBookDisplay')
    var userQuery = input.val()
    userQuery = userQuery.toLowerCase().split(' ').join('+')
    console.log('user query: ' + userQuery)
    ulBookDisplay.empty()

    var getLink = 'https://www.googleapis.com/books/v1/volumes?q=' + userQuery
  //  + '&callback=handleResponse'

    $.get(getLink)
    .done(function (response) {
      var book_search = response.items
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
  })

  $('#ulBookDisplay').on('click', '.readBtn', function () {
    var bookTitle = $(this).parent().find('h4').text()
    var bookAuthor = $(this).parent().find('h6').text()
    var json = JSON.stringify({
      bookTitle,
      bookAuthor
    })

    // console.log(json)
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
      // if(message says success). add the book into the users read books array
    })

    // get the book id ?? but i havent created the book item
      // create the book into the db
    // push the book id to the user.readBooks array
    // which user? the one in the current session
    // after i push the book id? ??????
  })
})
