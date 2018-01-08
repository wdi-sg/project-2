$(document).ready(function(){

  let socket = io()
  let ew = $('#ew')
  let ns = $('#ns')
  let ne = $('#ne')
  let dt = $('#dt')
  let circle = $('#circle')
  let others = $('#others')
  let aw;
  // aw = document.getElementById('announce')
  aw = document.querySelector('.scroll')
  aw.scrollTop = aw.scrollHeight;

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

  socket.on('loadewok', function(data){
    ew.append('<li class="tweet"><strong> All OK! </strong></li>')
  })

  socket.on('loadnstweets', function(data){
    // console.log(data.tweet)
    $.each(data.tweet, function(i, tweet){
      ns.append('<li class="tweet"><strong>'+tweet.tweetUser+'</strong><br>'+tweet.tweetContent+'<br><strong>'+tweet.tweetDate+'</strong></li>')
      // console.log(data.tweet)
    })
  })

  socket.on('loadnsok', function(data){
    ns.append('<li class="tweet"><strong> All OK! </strong></li>')
  })

  socket.on('loadnetweets', function(data){
    // console.log(data.tweet)
    $.each(data.tweet, function(i, tweet){
      ne.append('<li class="tweet"><strong>'+tweet.tweetUser+'</strong><br>'+tweet.tweetContent+'<br><strong>'+tweet.tweetDate+'</strong></li>')
      // console.log(data.tweet)
    })
  })

  socket.on('loadneok', function(data){
    ne.append('<li class="tweet"><strong> All OK! </strong></li>')
  })

  socket.on('loaddttweets', function(data){
    // console.log(data.tweet)
    $.each(data.tweet, function(i, tweet){
      dt.append('<li class="tweet"><strong>'+tweet.tweetUser+'</strong><br>'+tweet.tweetContent+'<br><strong>'+tweet.tweetDate+'</strong></li>')
      // console.log(data.tweet)
    })
  })

  socket.on('loaddtok', function(data){
    dt.append('<li class="tweet"><strong> All OK! </strong></li>')
  })

  socket.on('loadcircletweets', function(data){
    // console.log(data.tweet)
    $.each(data.tweet, function(i, tweet){
      circle.append('<li class="tweet"><strong>'+tweet.tweetUser+'</strong><br>'+tweet.tweetContent+'<br><strong>'+tweet.tweetDate+'</strong></li>')
      // console.log(data.tweet)
    })
  })

  socket.on('loadcircleok', function(data){
    circle.append('<li class="tweet"><strong> All OK! </strong></li>')
  })

  socket.on('loadtweets', function(data){
    // console.log(data.tweet)
    $.each(data.tweet, function(i, tweet){
      others.append('<li class="tweet"><strong>'+tweet.tweetUser+'</strong><br>'+tweet.tweetContent+'<br><strong>'+tweet.tweetDate+'</strong></li>')
      // console.log(data.tweet)
    })
  })

  // Announcement delete

  $('.delete').on('click', function(e){
    e.preventDefault()
    var id = $(this).data('id') //get data-id

    $.ajax({
      url : '/delete/' + id,
      type : 'delete',
      success : function(data){
        // alert(data)
        location.reload();
      },
      error : function(data){
        alert("fail")
      }
    })
  })
});
