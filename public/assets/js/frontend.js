$(function() {
var options = {
  enableHighAccuracy: true,
  timeout: 9000,
  maximumAge: 0
}
//set a default co-ord.
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
  console.log("success", pos.coords)
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
      var $div = $('<div>')
      //save button
      var $saveBtn = $('<img src="../../assets/img/save.png" alt="save">')
      var $saveLink = $(`<a href="save/stops/${stops[i].stop.stopCode}" >`)
      $saveLink.append($saveBtn)

      //nearest stop and link
      var $newLink = $(`<a href="stop/${stops[i].stop.stopCode}" class="nearStopLi">`)
      var $newListItem = $(`<li>`)
      $newListItem.text(`${stops[i].stop.stopCode}: ${stops[i].stop.description},      ${stops[i].stop.road} is ${dist}m away`)
      $newLink.append($newListItem)

      //add save and link to UL
      $div.append($saveLink)
      $div.append($newLink)
      $newULList.append($div)
      // $newULList.append($newLink)
      // $newULList.append($saveLink)
    }
    $nearDiv.append($newULList)
    $(".nearStopLi").css( {"color": "black"})
  }

}) //end jquery
