$(document).ready(function () {
  // prevent form submission
  // send async post to server and save new tweet to db
  // when server responds with success
  // manipulate dom to update the tweet
  var $tweet = $('.tweet')

  $tweet.on('submit', function(e) {
    e.preventDefault()

    var $tweetNum = $('#tweetNum')
    var tweetMessage = $('#newTweet').val()
    var form = $(this)
    var formData = form.serializeArray()
    var userId = formData[0].value
    var message = formData[1].value
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
        var $li = $('<li>') // create new list element
        $li.text(message) // change text of list element to message
        $('#wall').append($li) // append new list element to wall
        $('#newTweet').val('') // empty text area
        $tweetNum.text()
      }
    )
    .catch(err => console.log(err))
  })
})
