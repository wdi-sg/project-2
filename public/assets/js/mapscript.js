var input1 = $('#field1')
var input2 = $('#field2')

function initMap () {
  var directionsService = new google.maps.DirectionsService
  var directionsDisplay = new google.maps.DirectionsRenderer
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 1.307820, lng: 103.831830},
    zoom: 19
  })
  var autocomplete1 = new google.maps.places.Autocomplete(input1[0]) // adds autocomplete feature to Start bldg field
  var autocomplete2 = new google.maps.places.Autocomplete(input2[0])

  autocomplete1.addListener('place_changed', startPostalCode)
  autocomplete2.addListener('place_changed', endPostalCode)

  // var componentForm = {
  //   street_number: 'short_name',
  //   route: 'long_name',
  //   locality: 'long_name',
  //   administrative_area_level_1: 'short_name',
  //   country: 'long_name',
  //   postal_code: 'short_name'
  // }

  function startPostalCode () {
         // Get the place details from the autocomplete object.
    var place = autocomplete1.getPlace()

    // for (var component in componentForm) {
    //   document.getElementById(component).value = ''
    //   document.getElementById(component).disabled = false
    // }

    // console.log(place.formatted_address.substr(place.formatted_address.length - 6))
    var startPostal = place.formatted_address.substr(place.formatted_address.length - 6) // returns postal code from google map
         // Get each component of the address from the place details
         // and fill the corresponding field on the form.
    // for (var i = 0; i < place.address_components.length; i++) {
    //   var addressType = place.address_components[i].types[0]
    //   if (componentForm[addressType]) {
    //     var val = place.address_components[i][componentForm[addressType]]
    //     document.getElementById(addressType).value = val
    //   }
    // }
  }

  function endPostalCode () {
    var place = autocomplete2.getPlace()
    var endPostal = place.formatted_address.substr(place.formatted_address.length - 6)
  }

  directionsDisplay.setMap(map)

  var onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsDisplay)
  }
  $('#field2').on('change', onChangeHandler)
}
function calculateAndDisplayRoute (directionsService, directionsDisplay) {
  directionsService.route({
    origin: $('#field1').val(),
    destination: $('#field2').val(),
    travelMode: 'DRIVING'
  },
  function (response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response)
    } else {
      window.alert('Directions ' + status + ', please ensure valid addresses are entered in both Start and End fields.')
    }
  })
}
