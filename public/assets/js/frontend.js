$(function () {

  // Parallax initialization
  $('.parallax').parallax()
  $('select').material_select();
   $(".button-collapse").sideNav();
   $('.modal').modal();

  $('.up').click(function () {
    var id = $(this).attr('data')
    var currentUp = $(this).attr('upvotes')
    var currentNum = $(`#${id}`).text()
    $.post('/vote/upvote', {current: currentNum, obj: id, up: currentUp}, function (dataBack) {
      $(`#${id}`).text(dataBack)
    })
    $(this).attr('upvotes', parseInt(currentUp) + 1)
  })

  $('.down').click(function () {
    var id = $(this).attr('data')
    var currentDown = $(this).attr('downvotes')
    var currentNum = $(`#${id}`).text()
    $.post('/vote/downvote', {current: currentNum, obj: id, down: currentDown}, function (dataBack) {
      $(`#${id}`).text(dataBack)
    })
    $(this).attr('downvotes', parseInt(currentDown) + 1)
  })

  $('.ansup').click(function () {
    var id = $(this).attr('data')
    var currentUp = $(this).attr('upvotes')
    var currentNum = $(`#${id}`).text()
    $.post('/vote/ansupvote', {current: currentNum, obj: id, up: currentUp}, function (dataBack) {
      $(`#${id}`).text(dataBack)
    })
    $(this).attr('upvotes', parseInt(currentUp) + 1)
  })

  $('.ansdown').click(function () {
    var id = $(this).attr('data')
    var currentDown = $(this).attr('downvotes')
    var currentNum = $(`#${id}`).text()
    $.post('/vote/ansdownvote', {current: currentNum, obj: id, down: currentDown}, function (dataBack) {
      $(`#${id}`).text(dataBack)
    })
    $(this).attr('downvotes', parseInt(currentDown) + 1)
  })

  const $searchField = $('#searchField')
  const $resultDiv = $(".searchResults")
  // - Upon typing, send request to server to search for data, name simillar to keyword
  $searchField.on('keyup', e => {
    var json = JSON.stringify({
      keyword: e.target.value
    })
    // where the routes for searching will be, shoudl return JSON file

    fetch('/search', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'},
      body: json
    })
    .then(response => {
      return response.json()
    })
    .then(showResults)
    .catch(err=> console.log(err))
})

function showResults(data){
  let allResults = data.map(thread=>{

    const $newList = $("<ul class='test'>")
    const $newItem = $("<li>").text(thread.question)
    const $newLink = $(`<a href="/thread/${thread._id}">`).text("View")
    $newItem.append($newLink)
    $newList.append($newItem)
    return $newList
  })
  $resultDiv.html('')
  $resultDiv.append(allResults)

}


})
