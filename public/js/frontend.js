$(function () {
  const $searchInput = $('#searchInput')
  const $searchResults = $('#searchResults')

    $searchInput.on('keyup', e => { // e is the event object of the keyup event
      var keyword = e.target.value
      var json = JSON.stringify({
        keyword
      })

      // console.log e to make it clear
      // https://developer.mozilla.org/en-US/docs/Web/Events/keyup

      // PITSTOP: SPLIT RIGHT WITH INDEX.JS `/search` for better understanding
      fetch('/search', {
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
      let allLocations = data.map(location => {
        const $newCol = $('<div class="col-4">')
        const $newCard = $('<div class="card">')
        const $newCardBody = $('<div class="card-body">')
        const $newCardTitle = $('<h4 class="card-title">')
        const $newCardText = $('<p class="card-text">')
        const $newCardLinks = $(`<form
          class="form-inline"
          action="/locations/${location.id}?_method=DELETE"
          method="post"
        >`)

        $newCardTitle.text(location.name)
        $newCardText.html(
          `
            ${location.country} ${location.type}<br>
            ${location.title}<br>
            ${location.description}
          `
        )

        $newCardBody.append($newCardTitle, $newCardText)

        // TODO: add the form section too

        $newCard.append($newCardBody)
        $newCol.append($newCard)
        return $newCol
      })

      $searchResults.html('')
      $searchResults.append(allLocations)
    }

})
