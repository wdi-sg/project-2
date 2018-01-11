$(document).ready(function () {

  let socket = io()
  let ew = $('#ew')
  let ns = $('#ns')
  let ne = $('#ne')
  let dt = $('#dt')
  let circle = $('#circle')
  let others = $('#others')
  let aw;
  let ewDisplay = $('#ewOk')
  let nsDisplay = $('#nsOk')
  let neDisplay = $('#neOk')
  let dtDisplay = $('#dtOk')
  let circleDisplay = $('#circleOk')
  let allDisplay = $('#allOk')

  setTimeout(function () {
    if (document.getElementById('ew').getElementsByTagName('li').length < 2) {
      ewDisplay.show()
    }
    if (document.getElementById('ns').getElementsByTagName('li').length < 2) {
      nsDisplay.show()
    }
    if (document.getElementById('ne').getElementsByTagName('li').length < 2) {
      neDisplay.show()
    }
    if (document.getElementById('dt').getElementsByTagName('li').length < 2) {
      dtDisplay.show()
    }
    if (document.getElementById('circle').getElementsByTagName('li').length < 2) {
      circleDisplay.show()
    }
    if (document.getElementById('others').getElementsByTagName('li').length < 2) {
      allDisplay.show()
    }
  }, 2000)

  aw = document.querySelector('.scroll')
  aw.scrollTop = aw.scrollHeight

  socket.on('loadewtweets', function (data) {
    ewDisplay.remove()
    $.each(data.tweet, function (i, tweet) {
      ew.append('<li class="tweet"><strong>' + tweet.tweetUser + ' · ' + tweet.tweetDate + '</strong><br>' + tweet.tweetContent + '</li>')
    })
  })

  socket.on('loadnstweets', function (data) {
    nsDisplay.remove()
    $.each(data.tweet, function (i, tweet) {
      ns.append('<li class="tweet"><strong>' + tweet.tweetUser + ' · ' + tweet.tweetDate + '</strong><br>' + tweet.tweetContent + '</li>')
    })
  })

  socket.on('loadnetweets', function (data) {
    neDisplay.remove()
    $.each(data.tweet, function (i, tweet) {
      ne.append('<li class="tweet"><strong>' + tweet.tweetUser + ' · ' + tweet.tweetDate + '</strong><br>' + tweet.tweetContent + '</li>')
    })
  })

  socket.on('loaddttweets', function (data) {
    dtDisplay.remove()
    $.each(data.tweet, function (i, tweet) {
      dt.append('<li class="tweet"><strong>' + tweet.tweetUser + ' · ' + tweet.tweetDate + '</strong><br>' + tweet.tweetContent + '</li>')
    })
  })

  socket.on('loadcircletweets', function (data) {
    circleDisplay.remove()
    $.each(data.tweet, function (i, tweet) {
      circle.append('<li class="tweet"><strong>' + tweet.tweetUser + ' · ' + tweet.tweetDate + '</strong><br>' + tweet.tweetContent + '</li>')
    })
  })

  socket.on('loadtweets', function (data) {
    allDisplay.remove()
    $.each(data.tweet, function (i, tweet) {
      others.append('<li class="tweet"><strong>' + tweet.tweetUser + ' · ' + tweet.tweetDate + '</strong><br>' + tweet.tweetContent + '</li>')
    })
  })

  // Announcement delete

  $('.delete').on('click', function(e){
    e.preventDefault()
    var id = $(this).data('id')

    $.ajax({
      url : '/delete/' + id,
      type : 'delete',
      success : function (data) {
        location.reload();
      },
      error : function (data) {
        console.log('Announcement does not exist.')
      }
    })
  })
})
