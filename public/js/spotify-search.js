console.log('spotify search up')

// function post(path, params) {
//   const form = document.createElement('form')
//   form.setAttribute('method', 'post')
//   form.setAttribute('action', window.location.href+'/add')

//   for(const key in params) {
//     if(params.hasOwnProperty(key)) {
//       const hiddenField = document.createElement('input')
//       hiddenField.setAttribute('type', 'hidden')
//       hiddenField.setAttribute('name', key)
//       hiddenField.setAttribute('value', params[key])

//       form.appendChild(hiddenField)
//     }
//   }

//   document.body.appendChild(form)
//   form.submit()
// }

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
      response.tracks.items.forEach((e, i) => {
        if (i < 8) {
          // console.log(e.album.images[0].url)
          // console.log(e.name, 'by', e.artists[0].name)
          let trackResult = document.createElement('div')
          trackResult.innerHTML = `
            <form action="${window.location.href + '/add'}" method="post">
              <input name="title" value="${e.name}" hidden>
              <input name="artist" value="${e.artists[0].name}" hidden>
              <div class='well well-track'onClick="javascript:this.parentNode.submit();">
                <img class='result-thumbnail pull-right' src='${e.album.images[0].url}'></img>
                <h4>${e.name}</h4>
                <p>${e.artists[0].name}</p>
              </div>
            </form>`
          console.log(trackResult)
          resultsPlaceholder.appendChild(trackResult)
        }
      })
      $('#results').hide()
      $('#results').fadeIn(300)
    }
  })
}

document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault()
  searchSpotify(document.getElementById('query').value)
}, false)