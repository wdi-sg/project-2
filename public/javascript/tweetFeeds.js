$(document).ready(function(){

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


  setTimeout(function(){
    // okDisplay.show()
    if(document.getElementById("ew").getElementsByTagName("li").length < 2){
      // console.log('meow')
      ewDisplay.show()
    }
    if(document.getElementById("ns").getElementsByTagName("li").length < 2){
      // console.log('meow')
      nsDisplay.show()
    }
    if(document.getElementById("ne").getElementsByTagName("li").length < 2){
      // console.log('meow')
      neDisplay.show()
    }
    if(document.getElementById("dt").getElementsByTagName("li").length < 2){
      // console.log('meow')
      dtDisplay.show()
    }
    if(document.getElementById("circle").getElementsByTagName("li").length < 2){
      // console.log('meow')
      circleDisplay.show()
    }
    if(document.getElementById("others").getElementsByTagName("li").length < 2){
      // console.log('meow')
      allDisplay.show()
    }
  }, 2000)

  // aw = document.getElementById('announce')
  aw = document.querySelector('.scroll')
  aw.scrollTop = aw.scrollHeight;

  // if($('#others li').length == 0){
  //   console.log('meep')
  // }
  socket.on('loadewtweets', function(data){
    // console.log(data.tweet)
    // Make the original property of tbr be hidden, only to be shown after ~3s of loading.
    ewDisplay.remove()
    $.each(data.tweet, function(i, tweet){
      ew.append('<li class="tweet"><strong>'+tweet.tweetUser+' · '+tweet.tweetDate+'</strong><br>'+tweet.tweetContent+'</li>')
      // console.log(data.tweet)
    })
  })

  socket.on('loadnstweets', function(data){
    // console.log(data.tweet)
    // let okDisplayRemover = document.querySelector('#nsOk')
    nsDisplay.remove()
    $.each(data.tweet, function(i, tweet){
      ns.append('<li class="tweet"><strong>'+tweet.tweetUser+' · '+tweet.tweetDate+'</strong><br>'+tweet.tweetContent+'</li>')
      // console.log(data.tweet)
    })
  })

  socket.on('loadnetweets', function(data){
    // console.log(data.tweet)
    // let okDisplayRemover = document.querySelector('#neOk')
    neDisplay.remove()
    $.each(data.tweet, function(i, tweet){
      ne.append('<li class="tweet"><strong>'+tweet.tweetUser+' · '+tweet.tweetDate+'</strong><br>'+tweet.tweetContent+'</li>')
      // console.log(data.tweet)
    })
      // ne.append('<li class="tweet"><strong> All OK! </strong></li>')
  })

  socket.on('loaddttweets', function(data){
    // console.log(data.tweet)
    // let okDisplayRemover = document.querySelector('#dtOk')
    dtDisplay.remove()
    $.each(data.tweet, function(i, tweet){
      dt.append('<li class="tweet"><strong>'+tweet.tweetUser+' · '+tweet.tweetDate+'</strong><br>'+tweet.tweetContent+'</li>')
      // console.log(data.tweet)
    })
  })

  // socket.on('loaddtok', function(){
  //   dt.append('<li class="tweet"><strong> All OK! </strong></li>')
  // })

  socket.on('loadcircletweets', function(data){
    // console.log(data.tweet)
    // let okDisplayRemover = document.querySelector('#circleOk')
    circleDisplay.remove()
    $.each(data.tweet, function(i, tweet){
      circle.append('<li class="tweet"><strong>'+tweet.tweetUser+' · '+tweet.tweetDate+'</strong><br>'+tweet.tweetContent+'</li>')
      // console.log(data.tweet)
    })
  })

  socket.on('loadtweets', function(data){
    allDisplay.remove()
    $.each(data.tweet, function(i, tweet){
      others.append('<li class="tweet"><strong>'+tweet.tweetUser+' · '+tweet.tweetDate+'</strong><br>'+tweet.tweetContent+'</li>')
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
        console.log('Announcement does not exist.')
      }
    })
  })
});
