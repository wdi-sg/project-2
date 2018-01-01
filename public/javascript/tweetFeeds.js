$(document).ready(function(){

  let socket = io()
  let ew = $('#ew')
  let ns = $('#ns')
  let ne = $('#ne')
  let dt = $('#dt')
  let circle = $('#circle')
  let others = $('#others')

  // if($('#others li').length == 0){
  //   console.log('meep')
  // }

  socket.on('loadewtweets', function(data){
    // console.log(data.tweet)
    $.each(data.tweet, function(i, tweet){
      ew.append('<li class="tweet"><strong>'+tweet.tweetUser+'</strong><br>'+tweet.tweetContent+'<br><strong>'+tweet.tweetDate+'</strong></li>')
      // console.log(data.tweet)
    })
  })

  socket.on('loadnstweets', function(data){
    // console.log(data.tweet)
    $.each(data.tweet, function(i, tweet){
      ns.append('<li class="tweet"><strong>'+tweet.tweetUser+'</strong><br>'+tweet.tweetContent+'<br><strong>'+tweet.tweetDate+'</strong></li>')
      // console.log(data.tweet)
    })
  })

  socket.on('loadnetweets', function(data){
    // console.log(data.tweet)
    $.each(data.tweet, function(i, tweet){
      ne.append('<li class="tweet"><strong>'+tweet.tweetUser+'</strong><br>'+tweet.tweetContent+'<br><strong>'+tweet.tweetDate+'</strong></li>')
      // console.log(data.tweet)
    })
  })

  socket.on('loaddttweets', function(data){
    // console.log(data.tweet)
    $.each(data.tweet, function(i, tweet){
      dt.append('<li class="tweet"><strong>'+tweet.tweetUser+'</strong><br>'+tweet.tweetContent+'<br><strong>'+tweet.tweetDate+'</strong></li>')
      // console.log(data.tweet)
    })
  })

  socket.on('loadcircletweets', function(data){
    // console.log(data.tweet)
    $.each(data.tweet, function(i, tweet){
      circle.append('<li class="tweet"><strong>'+tweet.tweetUser+'</strong><br>'+tweet.tweetContent+'<br><strong>'+tweet.tweetDate+'</strong></li>')
      // console.log(data.tweet)
    })
  })

  socket.on('loadtweets', function(data){
    // console.log(data.tweet)
    $.each(data.tweet, function(i, tweet){
      others.append('<li class="tweet"><strong>'+tweet.tweetUser+'</strong><br>'+tweet.tweetContent+'<br><strong>'+tweet.tweetDate+'</strong></li>')
      // console.log(data.tweet)
    })
  })

});
