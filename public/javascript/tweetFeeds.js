$(document).ready(function(){

  let socket = io()
  let ew = $('#ew')
  let ns = $('#ns')
  let ne = $('#ne')
  let dt = $('#dt')
  let circle = $('#circle')
  let others = $('#others')
  let aw;
  let okDisplay = $('.okDisplay')

  // setTimeout(function(){
  //   okDisplay.show()
  // }, 2000)
  // aw = document.getElementById('announce')
  aw = document.querySelector('.scroll')
  aw.scrollTop = aw.scrollHeight;

  // if($('#others li').length == 0){
  //   console.log('meep')
  // }

  socket.on('loadewtweets', function(data){
    // console.log(data.tweet)
    // Make the original property of tbr be hidden, only to be shown after ~3s of loading.
    // let okDisplayRemover = document.querySelector('#ewOk')
    // okDisplayRemover.remove()
    $.each(data.tweet, function(i, tweet){
      ew.append('<li class="tweet"><strong>'+tweet.tweetUser+'</strong><br>'+tweet.tweetContent+'<br><strong>'+tweet.tweetDate+'</strong></li>')
      // console.log(data.tweet)
    })
  })

  socket.on('loadnstweets', function(data){
    // console.log(data.tweet)
    // let okDisplayRemover = document.querySelector('#nsOk')
    // okDisplayRemover.remove()
    $.each(data.tweet, function(i, tweet){
      ns.append('<li class="tweet"><strong>'+tweet.tweetUser+'</strong><br>'+tweet.tweetContent+'<br><strong>'+tweet.tweetDate+'</strong></li>')
      // console.log(data.tweet)
    })
  })

  socket.on('loadnetweets', function(data){
    // console.log(data.tweet)
    // let okDisplayRemover = document.querySelector('#neOk')
    // okDisplayRemover.remove()
    $.each(data.tweet, function(i, tweet){
      ne.append('<li class="tweet"><strong>'+tweet.tweetUser+'</strong><br>'+tweet.tweetContent+'<br><strong>'+tweet.tweetDate+'</strong></li>')
      // console.log(data.tweet)
    })
      // ne.append('<li class="tweet"><strong> All OK! </strong></li>')
  })

  socket.on('loaddttweets', function(data){
    // console.log(data.tweet)
    // let okDisplayRemover = document.querySelector('#dtOk')
    // okDisplayRemover.remove()
    $.each(data.tweet, function(i, tweet){
      dt.append('<li class="tweet"><strong>'+tweet.tweetUser+'</strong><br>'+tweet.tweetContent+'<br><strong>'+tweet.tweetDate+'</strong></li>')
      // console.log(data.tweet)
    })
  })

  // socket.on('loaddtok', function(){
  //   dt.append('<li class="tweet"><strong> All OK! </strong></li>')
  // })

  socket.on('loadcircletweets', function(data){
    // console.log(data.tweet)
    // let okDisplayRemover = document.querySelector('#circleOk')
    // okDisplayRemover.remove()
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
