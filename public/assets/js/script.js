var place_url = ""

// GOOGLE MAP
function initMap () {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 1.290270, lng: 103.851959},
    zoom: 13
  })

  var input = document.getElementById('pac-input')

  var autocomplete = new google.maps.places.Autocomplete(input)
  autocomplete.bindTo('bounds', map)

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)

  var infowindow = new google.maps.InfoWindow()
  var infowindowContent = document.getElementById('infowindow-content')
  infowindow.setContent(infowindowContent)
  var marker = new google.maps.Marker({
    map: map
  })
  marker.addListener('click', function () {
    infowindow.open(map, marker)
  })

  autocomplete.addListener('place_changed', function () {
    infowindow.close()
    var place = autocomplete.getPlace()
    console.log(place.url)
    if (!place.geometry) {
      return
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport)
    } else {
      map.setCenter(place.geometry.location)
      map.setZoom(17)
    }

          // Set the position of the marker using the place ID and location.
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
    })
    marker.setVisible(true)

    infowindowContent.children['place-name'].textContent = place.name
    // infowindowContent.children['place-id'].textContent = place.place_id
    infowindowContent.children['place-address'].textContent = place.formatted_address
    // infowindowContent.children['place-url'].textContent = place.url
    infowindow.open(map, marker)
  })
}

// SEARCH FORM
$(function () {
  const $searchInput = $('#searchInput')
  const $searchResults = $('#searchResults')

  $searchInput.on('mouseleave', e => { // e is the event object of the keyup event
    var keyword = e.target.value
    var json = JSON.stringify({
      keyword
    })

    // PITSTOP: SPLIT RIGHT WITH INDEX.JS `/search` for better understanding
    fetch('/search', {
      method: 'POST',
      body: json,
      headers: {
        "Content-Type" : "application/json"
      }
    })
    .then(response => response.json()) // convert the json file into js object
    .then(data => showResults(data)) // at this point we got the data
  })

  function showResults(data) {
    let allTrips = data.map(routes => {
      const $newCol = $('<div class="col-4">')
      const $newCard = $('<div class="card">')
      const $newCardBody = $('<div class="card-body">')
      const $newCardImg = $('<img class="card-img-top" src=" " alt=" ">')
      const $newCardTitle = $('<h4 class="card-title">')
      const $newCardText = $('<p class="card-text">')
      const $newCardLinks = $(`<form
        class="form-inline"
        action="/routes/${ routes.id }?_method=DELETE"
        method="post"
      >`)

      $newCardTitle.text(routes.title)
      $newCardText.html(
        `
          ${routes.address} ${routes.category}<br>
          ${routes.description }<br/>
          ${routes.dateCreated}

        `
      )

      $newCardBody.append($newCardTitle, $newCardText)

      // TODO: add the form section too

      $newCard.append($newCardBody)
      $newCol.append($newCard)
      return $newCol

    })

    $searchResults.html('')
    $searchResults.append(allTrips)
  }
})
