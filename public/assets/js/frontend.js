$(function() {
var options = {
  enableHighAccuracy: true,
  timeout: 9000,
  maximumAge: 0
}
//set a dafult co-ord.
var crd = {
  latitude: 1.2965676,
  longitude: 103.8521184,
  altitude: null,
  accuracy: null,
  altitudeAccuracy: null
}
//upon successfully getting position form webapi,
function success(pos) {
  //set lat/long to an object we defined.
  let {
    latitude,
    longitude
  } = pos.coords
  console.log(crd)
  console.log('fetch now')
  //create json with the above data, to prep for sending to backend
  var sendingJson = JSON.stringify({
    latitude,
    longitude
  })
  //using fetch, send the lat/long to '/', via post method, as a json in the body
  fetch('/', {
      method: 'POST',
      body: sendingJson,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      response.json() //return promise
        .then(data => showNearest(data.nearest))
      // .then(data=>console.log(data.nearest[0].stop.stopCode))
    })
};

function error(err) {
  console.log('Your current position is:')
  console.log(`Latitude : ${crd.latitude}`)
  console.log(`Longitude: ${crd.longitude}`)
  console.warn(`ERROR(${err.code}): ${err.message}`)
};
//start jquery


  //upon button click, run geolocation function in web api
  $('button').on('click', () => {
    navigator.geolocation.getCurrentPosition(success, error, options)
    // fetch
  })
  // set event handler, onclick.

  function showNearest(stops) {
    // console.log(stops[0], 'first stop');
    var $nearDiv = $('.stopsNearby')
    var $newULList = $('<ul class="nearStopUL">')
    for (var i = 0; i < stops.length; i++) {
      var dist = Math.round(stops[i].dist)
      var $newLink = $(`<a href="stop/${stops[i].stop.stopCode}" class="nearStopLi">`)
      var $newListItem = $(`<li>`)
      $newListItem.text(`${stops[i].stop.stopCode}: ${stops[i].stop.description},      ${stops[i].stop.road} is ${dist}m away`)
      $newLink.append($newListItem)
      $newULList.append($newLink)

    }
    //
    // var $newListItem1 = $('<li class="nearStopLi">')
    // var $newListItem2 = $('<li class="nearStopLi">')
    // var $newListItem3 = $('<li class="nearStopLi">')
    // $newListItem1.text(stops[0].stopCode)
    // $newListItem2.text(stops[1].stopCode)
    // $newListItem3.text(stops[2].stopCode)
    // $newULList.append($newListItem1)
    // $newULList.append($newListItem2)
    // $newULList.append($newListItem3)
    $nearDiv.append($newULList)
    $(".nearStopLi").css( {"color": "black"})
  }

}) //end jquery
