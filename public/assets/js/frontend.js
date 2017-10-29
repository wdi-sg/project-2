// const success = require('../../../helpers/getLocation.js')
//1. moved var options out of jq
//2. get(path) out of jq
var options = {
  enableHighAccuracy: true,
  timeout: 9000,
  maximumAge: 0
}
//can I place success/error outside of jq, in helper files? not working atm
$(function() {
//upon successfully getting position form webapi,
function success(pos) {
  //set lat/long to an object we defined.
  let {
    latitude,
    longitude
  } = pos.coords
  console.log("success", pos.coords)
  // console.log('fetch now')
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
        .then(data => {
          showNearest(data.nearest)
          showMap({
            latitude,
            longitude
          }, data.nearest, data.geoMapKey)
          console.log(latitude, longitude)
        })
    })
}

function error(err) {
  // console.log('Your current position is:')
  // console.log(`Latitude : ${crd.latitude}`)
  // console.log(`Longitude: ${crd.longitude}`)
  console.warn(`ERROR(${err.code}): ${err.message}`)
};

//----------------gmap-todo add all, add center with color green, lg size and 'P'
//legend: center is current location, pins are stops nearby and key is google maps key

  function showMap(center, pins, key) {
    console.log(center);
    var url = `https://maps.googleapis.com/maps/api/staticmap?`
    var center = `center=${center.latitude},${center.longitude}&zoom=17&size=450x500&key=${key}&`
    var markers = `markers=color:yellow%7Clabel:S%7C`
    //todo change to loop.
    var pins = `|${center.latitude},${center.longitude}|${pins[0].stop.latitude},${pins[0].stop.longitude}|${pins[1].stop.latitude},${pins[1].stop.longitude}|${pins[2].stop.latitude},${pins[2].stop.longitude}|${pins[3].stop.latitude},${pins[3].stop.longitude}|${pins[4].stop.latitude},${pins[4].stop.longitude}|`
    $('.gmap').attr('src', url + center + markers + pins)
  }


  //----------------upon button click, run geolocation function in web api
  $('#getGeo').on('click', () => {
    $nearDiv.empty() //empty current bus stops, if any.
    navigator.geolocation.getCurrentPosition(success, error, options)
    // fetch
  })

  var $nearDiv = $('.stopsNearby')
  //----------------display nearest stops on home view
  //todo try with handlebars instead
  function showNearest(stops) {
    var $newULList = $('<ul class="nearStopUL">')
    for (var i = 0; i < stops.length; i++) {
      var dist = Math.round(stops[i].dist)
      var $div = $(`<div data-id="stop/${stops[i].stop.stopCode}">`)

      //save button
      var $saveBtn = $('<img src="../../assets/img/save.png" alt="save" class="saveStopBtn">')
      var $saveLink = $(`<a href="save/stops/${stops[i].stop.stopCode}" >`)
      $saveLink.append($saveBtn)

      //nearest stop and link
      var $newLink = $(`<a href="stop/${stops[i].stop.stopCode}" class="nearStopLi">`)
      var $newListItem = $(`<li>`)
      $newListItem.text(`${stops[i].stop.stopCode}: ${stops[i].stop.description},${stops[i].stop.road} is ${dist}m away`)
      $newLink.append($newListItem)

      //add save and link to UL
      $div.append($saveLink)
      // $div.append($saveBtn)
      $div.append($newLink)
      $newULList.append($div)
    }
    $nearDiv.append($newULList)
    $(".nearStopLi").css({
      "color": "black"
    })
  } //end showNearest



  //listen for speech input
  //todo - add commands like 'bus when' or 'hello bus' to actively listen for location, bus stops etc.
  //similar to 'ok google' and 'alexa'
  var recognition = new webkitSpeechRecognition()
  $('#speechButton').on('click', () => {
    recognition.start()
    console.log('listening')
  })
  $('#stopSpeechButton').on('click', () => {
    recognition.stop()
    console.log('stop listening')
  })
  recognition.lang = "en-SG" //test out and add multiple locales
  recognition.continuous = true
  recognition.interimResults = false
  recognition.onresult = function(event) {
    var interim_transcript = ''
    var final_transcript = ''
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      var input = event.results[i][0].transcript
      // console.log(input)
      if (input.includes("get stops nearby") || input.includes("get my location")) {
        $nearDiv.empty()
        navigator.geolocation.getCurrentPosition(success, error, options)
      }
      //add logic to loop through, and match keywords instead of phrases
      var stopPosInList = 0
      if (input.includes("stop one") || input.includes('stop 1') || input.includes("first stop ")) {
        stopPosInList = 1
      } else if (input.includes("stop two") || input.includes('stop 2') || input.includes("second stop ")) {
        stopPosInList = 2
      } else if (input.includes("stop three") || input.includes('stop 3') || input.includes("third stop ")) {
        stopPosInList = 3
      } else if (input.includes("stop four") || input.includes('stop 4') || input.includes("fourth stop ")) {
        stopPosInList = 4
      } else if (input.includes("stop five") || input.includes('stop 5') || input.includes("five stop ")) {
        stopPosInList = 5
      } else " "

      //nchild div of UL
      var $uLList = $(`.nearStopUL div:nth-child(${stopPosInList})`)
      // console.log($uLList)
      // $( "ul li:nth-child(2)" )
      var url = $uLList.data("id") //get bus stops and services view stored in data-id of div
      url ? get(`${url}`) : "" //check if url exists before calling get function otherwise do nothing
    }
    console.log(final_transcript)
  } //end onresult
}) //end jQuery

//------------------------------------------------------//

function get(path) { //re-use this code
  var form = document.createElement("form")
  form.setAttribute("method", "get")
  form.setAttribute("action", path)
  document.body.appendChild(form)
  form.submit()
}
