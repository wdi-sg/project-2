
  function initMap() {
    var userMap = new google.maps.Map(document.getElementById('userMap'), {
      zoom: 11,
      center: {
        lat: 1.3521,
        lng: 103.8198
      },
      mapTypeId: 'hybrid'
    })

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var initialLocation = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        )
        userMap.setCenter(initialLocation)
      })
    }

    $.get('/teachers/test').done(function(studentArr) {
      // for (var i = 0; i < studentArr.length; i++) {
        // var coords = studentArr[i].coordinates
        var latLng = new google.maps.LatLng(studentArr.latitude, studentArr.longitude)
        var marker = new google.maps.Marker({
          position: latLng,
          animation: google.maps.Animation.DROP,
          map: userMap
        })
        // attachName(marker, eateryArr[i].name, eateryArr[i]._id)
      // }

      // function attachName(marker, name, id) {
      //   var infowindow = new google.maps.InfoWindow({
      //     content: `<a href="/eateries/${id}">${name}</a>`
      //   })
      //   marker.addListener('click', function() {
      //     infowindow.open(marker.get('map'), marker)
      //   })
      // }
    })

  }
