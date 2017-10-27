
$(function () {
  const $searchInput = $('#searchInput')
  const $searchResults = $('#searchResults')
  const $searchGigs = $('#searchGigs')
  const $searchGigsResults = $('#searchGigsResults')

  $searchInput.on('keyup', e => { // e is the event object of the keyup event
    var keyword = e.target.value
    var json = JSON.stringify({
      keyword
    })

    fetch('/peeps', {
      method: 'POST',
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json()) // convert the json file into js object
    .then(showPeeps) // at this point we got the data
    .catch(err => console.log(err))
  })

  function showPeeps (data) {
    let allUsers = data.map(user => {
      const $newCol = $('<div class="col-4">')
      const $newCard = $('<div class="card">')
      const $newCardBody = $('<div class="card-body">')
      const $newCardTitle = $('<h4 class="card-title">')
      const $newCardText = $('<p class="card-text">')

      $newCardTitle.text(user.name)
      $newCardText.html(
        `${user.profile[0].skills}
        `
      )

      $newCardBody.append($newCardTitle, $newCardText)

      $newCard.append($newCardBody)
      $newCol.append($newCard)
      return $newCol
    })

    $searchResults.html('')
    $searchResults.append(allUsers)
  }

/* Search Gigs Section */

  $searchGigs.on('keyup', e => { // e is the event object of the keyup event
    var keyword = e.target.value
    var json = JSON.stringify({
      keyword
    })

    fetch('/gigs', {
      method: 'POST',
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  .then(response => response.json()) // convert the json file into js object
  .then(showGigs) // at this point we got the data
  .catch(err => console.log(err))
  })

  function showGigs (data) {
    let allGigs = data.map(user => {
      const $newCol = $('<div class="col-4">')
      const $newCard = $('<div class="card">')
      const $newCardBody = $('<div class="card-body">')
      const $newCardTitle = $('<h4 class="card-title">')
      const $newCardText = $('<p class="card-text">')

      $newCardTitle.text(gigs.name)
      $newCardText.html(
      `${gigs.wage} ${gigs.author}
      `
    )

      $newCardBody.append($newCardTitle, $newCardText)

      $newCard.append($newCardBody)
      $newCol.append($newCard)
      return $newCol
    })

    $searchGigsResults.html('')
    $searchGigsResults.append(allGigs)
  }

// ===== userSkills =====//

  $('#selectSkills').on('change', (e) => {
    console.log('trrigered')
    var userSkills = []
    // get previous value first
    var prev = $('#skills').val()
    console.log(prev)
    // get new added value
    var str = $('#selectSkills :selected').text()
    // userSkills.push($('#selectSkills :selected').text())
    var newValue = prev ? `${prev}, ${str}` : `${str}`
    $('#skills').attr('value', newValue)
  })
})
