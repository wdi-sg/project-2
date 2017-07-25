$(function () {
  // loading logo
  var $body = $('body')
  $(document).on({
    ajaxStart: function () { $body.addClass('loading') },
    ajaxStop: function () { $body.removeClass('loading') }
  })
  const $carparkSearch = $('#carparkSearch')
  // maps (from google map API)
  var $map = $('#map')
  var service
  var infowindow = new google.maps.InfoWindow()

  var singapore = {lat: 1.352083, lng: 103.819836}
  var carparkMarkers = []

  var map = new google.maps.Map(document.getElementById('map'), {
    center: singapore,
    zoom: 11
  })

  service = new google.maps.places.PlacesService(map)

  // search function
  $carparkSearch.on('submit', function (e) {
    e.preventDefault()
    carparkMarkers.forEach(function (marker) {
      marker.setMap(null)
    })
    carparkMarkers = []
    var query = $(this).serializeArray()[0].value
    var qString = `car+parks+near+${query}+singapore`
    service.textSearch({
      query: qString
    }, callback)
  })

  function callback (results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i]
        createMarker(results[i])
      }
      map.setZoom = 13
    }
  }

  // for each to create marker and button to add
  function createMarker (place) {
    var placeLoc = place.geometry.location
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    })

    google.maps.event.addListener(marker, 'click', function () {
      // content of the clicked marker
      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                place.formatted_address + '<br>' +
                (`<button class='addBtn' data-name="${place.name}" data-address="${place.formatted_address}">add</button>`) + '</div>')
      infowindow.open(map, this)
    })
  }
  // addBtn to add carparks to DB
  $map.on('click', '.addBtn', function (e) {
    e.preventDefault()
    const theBttn = $(this)

    var newCarpark = {
      name: theBttn.data('name'),
      address: theBttn.data('address')
    }
    // for saving
    $.post('/', newCarpark).done(function (data) {
      if (data.status === 200) {
        alert('Hurray! ' + data.message)
      }
    })
  })
})
