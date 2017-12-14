$(function () {
  $('.parallax').parallax()

  $('.dropdown-button').dropdown()

  $('select').material_select()

  $('.collapsible').collapsible()

  $('.slider').slider();

  const $deleteForm = $('.deleteForm')

  $deleteForm.on('submit', function (e) {
    e.preventDefault()

    var form = $(this)
    var formData = form.serializeArray()
    var restoId = formData[0].value
    var json = JSON.stringify({
      restoId
    })

    console.log(`delete this user ${userId}`)
    console.log(json)

    fetch('/deleteuser', {
      method: 'DELETE',
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log('manipulate the dom now')
      form.parents('.col-4').remove()
    })
  })

  const $searchInput = $('#searchInput')
  const $searchResults = $('#searchResults')

  $searchInput.on('change', e => { // e is the event object of the keyup event
    var keyword = e.target.value
    var json = JSON.stringify({
      keyword
    })

    fetch('/search', {
      method: 'POST',
      body: json,
      headers: {
        "Content-Type" : "application/json"
      }
    })
    .then(response => response.json()) // convert the json file into js object
    .then(data => showResults(data)) // at this point we got the data
  })

  function showResults(data) {
    let allCCs = data.map(routes => {
      const $newCol = $('<div class="card-row">')
      const $newCard = $('<div class="card">')
      const $newCardImg = $('<img class-img-top>')
      const $newCardBody = $('<div class="card-body">')
      const $newCardTitle = $('<h6 class="card-title">')
      const $newCardText = $('<p class="card-text">')
      const $newCardLinks = $(`<form
        class="form-inline"
        action="/routes/${ routes.id }?_method=DELETE"
        method="post"
      >`)

      $newCardImg.attr('src', routes.picture)

      $newCardTitle.text(routes.title)
      $newCardText.html(
        `
          <p class="mb-0">
          ${routes.address} <br>
          </p>
          <footer class="blockquote-footer">${routes.category}</footer>
          <hr>
          <p style="font-size:14px; color: black;">${routes.description}</p>
          <hr>
          <div class="row">
            <div class="col"><small class="text-muted">${ moment(routes.dateCreated).format('MMMM Do YYYY') }</small></div>
            <div class="col text-right"><small><em><a href="https://www.google.com/maps/search/?api=1&query=${routes.latitude},${routes.longitude}&query_place_id=${routes.placeId}" target="_blank">View google map</a></em></small></div>
          </div>
        `
      )

      $newCardBody.append($newCardTitle, $newCardText)
      $newCard.append($newCardImg, $newCardBody)
      $newCol.append($newCard)
      return $newCol

    })

    $searchResults.html('')
    $searchResults.append(allCCs)
  }

})
