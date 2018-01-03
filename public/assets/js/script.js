$(document).ready(function () {
  const $tweet = $('.tweet')
  const $searchBar = $('#autocomplete-input')
  const $autocomplete = $('#autocomplete')

  // prevent form submission
  // send async post to server and save new tweet to db
  // when server responds with success
  // manipulate dom to update the tweet
  $tweet.on('submit', function(e) {
    e.preventDefault()

    var $tweetNum = $('#tweetNum')
    var tweetMessage = $('#newTweet').val()
    var form = $(this)
    var formData = form.serializeArray()
    var userId = formData[0].value
    var username = formData[1].value
    var name = formData[2].value
    var tweetNum = formData[3].value
    var message = formData[4].value
    var json = JSON.stringify({userId, message})

    fetch('/new-tweet', {
      method: 'PUT',
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(
      () => {
        // increase tweet counter
        tweetNum++
        $tweetNum.text(`Tweets: ${tweetNum}`)

        var $row = $('<div class="row">')
        var $card = $('<div class="card">')

        var $authorContainer = $('<div class="card-action">')
        var $authorName = $('<a href="#" class="black-text tweetAuthorName">').text(`${name}`)
        var $author = $('<p class="grey-text tweetAuthor">').text(`@${username}`)

        var $messageContainer = $('<div class="card-content black-text">')
        var $message = $('<p>').text(message)

        $messageContainer.append($message)
        $authorContainer.append($authorName).append($author)
        $card.append($authorContainer).append($messageContainer)
        $row.append($card)

        $('#wall').prepend($row) // append new list element to wall
        $('#newTweet').val('') // empty text area
        $tweetNum.text()
      }
    )
    .catch(err => console.log(err))
  })

  $searchBar.on('keyup', e => {
    var keyword = e.target.value
    var json = JSON.stringify({ keyword })

    $autocomplete.empty() // empty list first before loading new

    fetch('/search', {
      method: 'POST',
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json()) // convert the json file into js object
    .then(users => { // forEach user, create new li, add name, add to ul
      // var data = {} FIX AUTOCOMPLETE
      users.forEach(user => {
        // data[user] = null
        var $li = $('<li>')
        $li.text(user.username)
        $autocomplete.append($li)
      })
      // console.log(data)
      if(keyword === '') $autocomplete.empty() // empties autocomplete list if input field is emptied
    })
    .catch(err => console.log(err))
  })
})
