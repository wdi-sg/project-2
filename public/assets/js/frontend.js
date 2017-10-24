$(function () {
  var options = {
    enableHighAccuracy: true,
    timeout: 9000,
    maximumAge: 0
  }
  var crd = {latitude: 1.2965676, longitude: 103.8521184, altitude: null, accuracy: null, altitudeAccuracy: null}

  function success (pos) {
    let { latitude, longitude } = pos.coords
    console.log(crd)
    console.log('fetch now')

    var sendingJson = JSON.stringify({ latitude, longitude })

    fetch('/', {
      method: 'POST',
      body: sendingJson,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    // .then(json => console.log(json))
  };

  function error (err) {
    console.log('Your current position is:')
    console.log(`Latitude : ${crd.latitude}`)
    console.log(`Longitude: ${crd.longitude}`)
    console.warn(`ERROR(${err.code}): ${err.message}`)
  };

  $('button').on('click', () => {
    navigator.geolocation.getCurrentPosition(success, error, options)

    // fetch
  })
  // set event handler, onclick.
})
