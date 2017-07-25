$(function () {
  // loading logo
  var $body = $('body')
  $(document).on({
    ajaxStart: function () { $body.addClass('loading') },
    ajaxStop: function () { $body.removeClass('loading') }
  })

  const $carparkSearch = $('#carparkSearch')

  // maps
  var map
  var service
  var infowindow = new google.maps.InfoWindow()
  var query

  var singapore = {lat: 1.352083, lng: 103.819836}

  map = new google.maps.Map(document.getElementById('map'), {
    center: singapore,
    zoom: 11
  })

  var request = {
    location: singapore,
    radius: '',
    query: query
  }

  service = new google.maps.places.PlacesService(map)

  service.textSearch(request, callback)

  function callback (results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i]
        createMarker(results[i])
      }
      map.setZoom()
    }
  }

  function createMarker (place) {
    var placeLoc = place.geometry.location
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    })

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(place.name)
      infowindow.open(map, this)
    })
  }

  // search function

  $carparkSearch.on('submit', function (e) {
    e.preventDefault()
    var keywordObj = $(this).serializeArray()
    var keyword = keywordObj[0].value
    var qString = `car+parks+near+${keyword}+singapore`
    query = qString
    service.textSearch(query, callback)
  })
})
