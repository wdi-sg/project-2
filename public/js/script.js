$(function() {
  if (document.getElementById('map')) {
    var pyrmont = {
      lat: -33.867,
      lng: 151.195
    }
    var markers = []

    var map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 13
    })

    var infowindow = new google.maps.InfoWindow()
    var service = new google.maps.places.PlacesService(map)
    $('#textSearchForm').on('submit', function(e) {
      e.preventDefault()
      markers.forEach(function(marker) {
        marker.setMap(null)
      })
      markers = []
      var query = $(this).serializeArray()[0].value
      service.textSearch({
        query: query
      }, callback)
    })

    var input = document.querySelector('#textSearchInput')
    var form = document.querySelector('#textSearchForm')
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(form)
    map.addListener('tilesloaded', function () {
      form.style.display = 'initial'
    })

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
        if (pagination.hasNextPage) pagination.nextPage()
        console.log(results)
        if (!pagination.hasNextPage) {
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
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        }
      })
      markers.push(marker)

      google.maps.event.addListener(marker, 'click', function() {
        if (place.photos) {
          var img = `<img src=${place.photos[0].getUrl({'maxWidth': 150, 'maxHeight': 150})}>`
        } else {
          img = ''
        }
        infowindow.setContent(`${img}<div class="infoWindowText">${place.name} @ ${place.formatted_address}</div><br><br><button class="addPlace">Add</button><br>`)
        infowindow.open(map, this)
        console.log(place)
        $('.addPlace').on('click', function() {
          console.log('button is clicked')
          console.log(place.place_id, place.name, place.formatted_address)
          var selectedTripID = $('#selectedTrip').serializeArray()[0].value
          var selectedDate = $('#selectedDate').serializeArray()[0].value
          var newPlace = {
            place_id: place.place_id,
            name: place.name,
            address: place.formatted_address,
            id: selectedTripID,
            date: selectedDate
          }
          $.post('/places', newPlace).done(function (data) {
              alert(data)
          })
        })
      })
    }
  }
  $('#selectedTrip').change(function() {
    var selectedTripID = $('#selectedTrip').serializeArray()[0].value
    $('.dateOption').remove()
    $.get(`/trips/${selectedTripID}`).done(function (data) {
      for (var i = 0; i < data.dates.length; i++) {
        var $option = $('<option>')
        $option.addClass('dateOption')
        $option.val(data.dates[i].date)
        $option.text(data.dates[i].date)
        $option.appendTo($('#selectedDate'))
      }
    })
  })
  $('#showTrip').on('click', function () {
    if ($('#selectedDate').serializeArray().length === 0) return alert('Please select a date!')
    var selectedTripID = $('#selectedTrip').serializeArray()[0].value
    var selectedDate = $('#selectedDate').serializeArray()[0].value
    // console.log(selectedDate);
    $.get(`/trips/${selectedTripID}`).done(function (data) {
      // console.log(data.name)
      $('#tripDisplay').text('')
      var $tripContent = $('<p>')
      $tripContent.addClass('tripContent')
      $tripContent.html(`${data.name} <br>`)
      $tripContent.appendTo($('#tripDisplay'))
      var selectedDateObj = data.dates.filter(function (date) {
        return date.date === selectedDate
      })
      console.log(selectedDateObj);
      var $dateContent = $('<p>')
      var $ul = $('<ul>')
      $dateContent.addClass('tripContent')
      $dateContent.html(`${selectedDateObj[0].date} <br>`)
      $dateContent.appendTo($('#tripDisplay'))
      for (var i = 0; i < selectedDateObj[0].places.length; i++) {
        var $placeContent = $('<li>')
        var $removeButton = $('<button>')
        var $viewOnMapButton = $('<button>')
        var $placeContentButtons = $('<div>')
        var $placeContentContainer = $('<div>')
        $placeContentContainer.addClass('placeContentContainer')
        $placeContent.html(`${selectedDateObj[0].places[i].name} @ ${selectedDateObj[0].places[i].address}<br>`)
        $placeContent.addClass('placeContent')
        $removeButton.text(`Remove from ${data.name}`)
        $removeButton.addClass('placeContentButton')
        $removeButton.appendTo($placeContentButtons)
        $viewOnMapButton.text('View on Google Maps')
        $viewOnMapButton.addClass('placeContentButton')
        $viewOnMapButton.appendTo($placeContentButtons)
        $placeContent.appendTo($placeContentContainer)
        $placeContentButtons.appendTo($placeContentContainer)
        $placeContentContainer.appendTo($ul)
        $removeButton.on('click', function () {
          $(this).parents('.placeContentContainer').remove()
        })
      }
      $ul.appendTo($('#tripDisplay'))
    })
  })
  $('#deletedTrip').on('click', function () {
    if (confirm('Are you sure?')){
      var $selectedTripID = $('#selectedTrip').serializeArray()[0].value
      $.ajax({
        url: `/trips/${$selectedTripID}`,
        type: 'DELETE',
        success: function(data) {
          console.log(data.name)
          $('option').filter(`:contains(${data.name})`).remove()
          $('.dateOption').remove()
          $('#tripDisplay').text('')
          var $tripContent = $('<p>')
          $tripContent.addClass('tripContent')
          $tripContent.html(`${data.name} is deleted!`)
          $tripContent.appendTo($('#tripDisplay'))
        }
      })
    }
  })
})
