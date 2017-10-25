// $(function () {
//   const $searchInput = $('#searchInput')
//   const $searchResults = $('#searchResults')
//
//   $searchInput.on('keyup', e => {
//     var keyword = e.target.value
//     var json = JSON.stringify({
//       keyword
//     })
//
//     fetch('/search', {
//       method: 'POST',
//       body: json,
//       headers: {
//         "Content-Type" : "application/json"
//       }
//     })
//     .then(response => response.json())
//     .then(showResults)
//     .catch(err => console.log(err))
//   })
//
//   function showResults(data) {
//     let allRestaurants = data.map(restaurant => {
//       const $newCol = $('<div class="col-4">')
//       const $newCard = $('<div class="card">')
//       const $newCardBody = $('<div class="card-body">')
//       const $newCardTitle = $('<h4 class="card-title">')
//       const $newCardText = $('<p class="card-text">')
//       const $newCardLinks = $(`<form
//         class="form-inline"
//         action="/restaurants/${restaurant.id}?_method=DELETE"
//         method="post"
//       >`)
//
//       $newCardTitle.text(restaurant.name)
//       $newCardText.html(
//         `
//           ${restaurant.address.building} ${restaurant.address.street}<br>
//           ${restaurant.borough}, NYC ${restaurant.address.zipcode }
//         `
//       )
//
//       $newCardBody.append($newCardTitle, $newCardText)
//
//
//       $newCard.append($newCardBody)
//       $newCol.append($newCard)
//       return $newCol
//     })
//
//     $searchResults.html('')
//     $searchResults.append(allRestaurants)
//   }
// })
