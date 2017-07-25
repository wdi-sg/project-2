$( function () {
  if (document.getElementById('map')) {
    var pyrmont = {lat: -33.867, lng: 151.195};
    var markers = []

    var map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 13
    });

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    $('#textSearchForm').on('submit', function(e) {
      e.preventDefault()
      markers.forEach(function(marker) {
        marker.setMap(null)
      })
      markers = []
      var query = $(this).serializeArray()[0].value
      service.textSearch({
        query: query
      }, callback);
    })

    var input = document.querySelector('#textSearchInput')
    var form = document.querySelector('#textSearchForm')
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(form)

    var autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['establishment']
    })

    // $('#test').on('click', function () {
    //   service.getDetails({
    //     placeId: 'ChIJYb3mA_sa2jERZqkAo2winQE'
    //   }, callbackId)
    // })

    function callbackId(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        createMarker(results)
        map.panTo(results.geometry.location)
        map.setZoom(13)
      }
    }

    function callback(results, status, pagination) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
        if(pagination.hasNextPage) pagination.nextPage()
        console.log(results)
        if(!pagination.hasNextPage){
          map.panTo(results[0].geometry.location)
          map.setZoom(13)
        }
      }
    }

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: {
          url: place.icon, // url
          scaledSize: new google.maps.Size(20, 20), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0,0) // anchor
        }
      })
      markers.push(marker)

      google.maps.event.addListener(marker, 'click', function () {
        if (place.photos) {
          var img = `<img src=${place.photos[0].getUrl({'maxWidth': 150, 'maxHeight': 150})}>`
        } else {
          img = ''
        }
        infowindow.setContent(`${img}<div class="infoWindowText">${place.name} @ ${place.formatted_address}</div><br><br><button class="addPlace">Add</button><br>`)
        infowindow.open(map, this)
        console.log(place)
        $('.addPlace').on('click', function () {
          console.log('button is clicked')
          console.log(place.place_id, place.name, place.formatted_address)
        })
      })
    }
  }
})
