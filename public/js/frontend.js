$(function () {
  const $searchInput = $('#searchInput')
  const $searchResults = $('#searchResults')

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
    .then(showResults) // at this point we got the data
    .catch(err => console.log(err))
  })

  function showResults (data) {
    let allUsers = data.map(user => {
      const $newCol = $('<div class="col-4">')
      const $newCard = $('<div class="card">')
      const $newCardBody = $('<div class="card-body">')
      const $newCardTitle = $('<h4 class="card-title">')
      const $newCardText = $('<p class="card-text">')

      $newCardTitle.text(user.name)
      $newCardText.html(
        `${user.profile.skills}
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
})
