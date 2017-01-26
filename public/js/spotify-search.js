let resultsPlaceholder = document.getElementById('results')
$('#results').hide()

const searchSpotify = function (query) {
  $.ajax({
    url: 'https://api.spotify.com/v1/search',
    data: {
      q: query,
      type: 'track'
    },
    success: function (response) {
      console.log(response)
      response.tracks.items.forEach((e, i) => {
        if (i < 8) {
          let trackResult = document.createElement('div')
          trackResult.innerHTML = `
            <form action="${window.location.href + '/add'}" method="post">
              <input name="title" value="${e.name}" hidden>
              <input name="artist" value="${e.artists[0].name}" hidden>
              <input name="image" value="${e.album.images[0].url}" hidden>
              <div class='well well-track'onClick="javascript:this.parentNode.submit();">
                <img class='result-thumbnail pull-right' src='${e.album.images[0].url}'></img>
                <h4>${e.name}</h4>
                <p>${e.artists[0].name}</p>
              </div>
            </form>`
          resultsPlaceholder.appendChild(trackResult)
        }
      })
      $('#results').hide()
      $('#results').slideDown(300)
    }
  })
}

document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault()
  $('#results').slideUp(300)
  resultsPlaceholder.innerHTML = ''
  searchSpotify(document.getElementById('query').value)
}, false)