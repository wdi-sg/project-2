$(function () {

  // Parallax initialization
  $('.parallax').parallax()
  $('select').material_select();
   $(".button-collapse").sideNav();
   $('.modal').modal()
   $(".dropdown-button").dropdown({
     hover: true,
     gutter: 0, // Spacing from edge
     belowOrigin: true });


  $('.up').click(function () {
    var check = $("#usercheck").val()
    if(check ==="") Materialize.toast('Please login to vote!', 1000)
    else if(check !== ""){
      var id = $(this).attr('data')
      var currentUp = $(this).attr('upvotes')
      var currentNum = $(`#${id}`).text()
      $.post('/vote/upvote', {current: currentNum, obj: id, up: currentUp}, function (dataBack) {
        $(`#${id}`).text(dataBack)
        if(currentNum !== $(`#${id}`).text()) Materialize.toast('Upvoted!', 1000)
      })
      $(this).attr('upvotes', parseInt(currentUp) + 1)

    }


  })

  $('.down').click(function () {
    var check = $("#usercheck").val()
    if(check ==="") Materialize.toast('Please login to vote!', 1000)
    else if(check !== ""){
    var id = $(this).attr('data')
    var currentDown = $(this).attr('downvotes')
    var currentNum = $(`#${id}`).text()
    $.post('/vote/downvote', {current: currentNum, obj: id, down: currentDown}, function (dataBack) {
      $(`#${id}`).text(dataBack)
    })
    $(this).attr('downvotes', parseInt(currentDown) + 1)
    Materialize.toast('Downvoted!', 1000)
  }

  })

  $('.ansup').click(function () {
    var check = $("#usercheck").val()
    if(check ==="") Materialize.toast('Please login to vote!', 1000)
    else if(check !== ""){
    var id = $(this).attr('data')
    var currentUp = $(this).attr('upvotes')
    var currentNum = $(`#${id}`).text()
    $.post('/vote/ansupvote', {current: currentNum, obj: id, up: currentUp}, function (dataBack) {
      $(`#${id}`).text(dataBack)
    })
    $(this).attr('upvotes', parseInt(currentUp) + 1)
    Materialize.toast('Upvoted!', 1000)
  }
  })

  $('.ansdown').click(function () {
    var check = $("#usercheck").val()
    if(check ==="") Materialize.toast('Please login to vote!', 1000)
    else if(check !== ""){
    var id = $(this).attr('data')
    var currentDown = $(this).attr('downvotes')
    var currentNum = $(`#${id}`).text()
    $.post('/vote/ansdownvote', {current: currentNum, obj: id, down: currentDown}, function (dataBack) {
      $(`#${id}`).text(dataBack)
    })
    $(this).attr('downvotes', parseInt(currentDown) + 1)
    Materialize.toast('Downvoted!', 1000)
  }
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

//Setup for course search
const $courseSearchField = $('#courseSearchField')
const $courseResultDiv = $(".courseSearchResults")
// - Upon typing, send request to server to search for data, name simillar to keyword
$courseSearchField.on('keyup', e => {
  var json = JSON.stringify({
    keyword: e.target.value
  })
  // where the routes for searching will be, shoudl return JSON file

  fetch('/course/search', {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'},
    body: json
  })
  .then(response => {
    return response.json()
  })
  .then(showCourseResults)
  .catch(err=> console.log(err))
})


function showCourseResults(data){
  let allResults = data.map(thread=>{

    const $newList = $("<ul class='test'>")
    const $newItem = $("<li>").text(thread.question)
    const $newLink = $(`<a href="/thread/${thread._id}">`).text("View")
    $newItem.append($newLink)
    $newList.append($newItem)
    return $newList
  })
  $courseResultDiv.html('')
  $courseResultDiv.append(allResults)

}






const $deleteForm = $('.deleteForm')

  $deleteForm.on('submit', function (e) {

    e.preventDefault()

    var form = $(this)
    var formData = form.serializeArray()
    console.log(formData);
    var divId = formData[0].value
    var json = JSON.stringify({
      divId
    })

    console.log(`delete this ${divId}`)
    console.log(json)

    fetch('/addAnswer/threadpage', {
      method: 'DELETE',
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log('manipulate the dom now')
      $(`.${divId}`).remove()
    })
  })

})
