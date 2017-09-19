$(function () {
  // loading logo
  var $body = $('body')
  $(document).on({
    ajaxStart: function () { $body.addClass('loading') },
    ajaxStop: function () { $body.removeClass('loading') }
  })
  // for mobile responsiveness
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target
        var $target = document.getElementById(target)

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    })
  }

  // for google maps markers
  const $carparkSearch = $('#carparkSearch')

  if (document.getElementById('map')) {
    // maps (from google map API)
    var $map = $('#map')
    var service
    var infowindow = new google.maps.InfoWindow()
    // to show SG map once map loaded
    var singapore = {lat: 1.352083, lng: 103.819836}
    var map = new google.maps.Map(document.getElementById('map'), {
      center: singapore,
      zoom: 11
    })
    var carparkMarkers = []

    service = new google.maps.places.PlacesService(map)

    // search function
    $carparkSearch.on('submit', function (e) {
      e.preventDefault()
      carparkMarkers.forEach(function (marker) {
        marker.setMap(null)
      })
      // clear all markers
      carparkMarkers = []
      // search query
      var query = $(this).serializeArray()[0].value
      var qString = `car+parks+near+${query}+singapore`
      service.textSearch({
        query: qString
      }, callback)
    })

    function callback (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i])
        }
      }
    }

    // for each to create marker and button to add
    function createMarker (place) {
      // markers properties
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      })
      carparkMarkers.push(marker)
      // zoom into first result(most legit result)
      map.setZoom(13)
      map.panTo(carparkMarkers[0].position)
      // info to display and button
      google.maps.event.addListener(marker, 'click', function () {
      // content of the clicked marker
        infowindow.setContent(`<div id='markerinfo'><strong>` + place.name + '</strong><br>' +
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
      $.post('/carparks', newCarpark).done(function (data) {
        if (data.status === 200) {
          alert('HUAT AH! ' + data.message)
        }
      })
    })
  }
})
