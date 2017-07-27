
$(function () {

  const $eventSearch = $('#eventSearch')
  const $searchResults = $('#searchResults')
  const $keywordSearch = $('#keywordSearch')
  const $spinner = $('#spinner')
  const $newUserForm = $('#newUserForm')

  const apiUrl = 'https://www.eventbriteapi.com/v3/events/search/?'

  //const apiKey = `&key=${GOOGLE_PLACE_KEY}`
  const apiKey = `&token=${GOOGLE_PLACE_KEY}`

  $newUserForm.on('submit', function (e) {
    e.preventDefault()

    $formData = $(this).serializeArray()

    var newUser = {
      user: {
        name: $formData[0].value,
        email: $formData[1].value,
        password: $formData[2].value
      }
    }

    $.ajax({
      url: '/users',
      type: 'post',
      data: JSON.stringify(newUser),
      dataType: 'json',
      contentType: 'application/json',
      success: function (output) {
        console.log(output)
      }
    })
  })

  $searchResults.on('click', '.addBttn', function (e) {
    e.preventDefault()

    const theBttn = $(this)

    var newEvent = {
      name: theBttn[0].dataset.name,
      dateTime: theBttn[0].dataset.datetime,
      imgUrl: theBttn[0].dataset.imgurl,
      eventUrl: theBttn[0].dataset.eventurl
    }

    $.post('/events', newEvent).done(function (data) {
      if (data.status === 'ok') {
        alert('Hurray! ' + data.message)
      }
    })
  })

  $('#spinner').data('speed')

  $eventSearch.on('submit', function (e) {
    e.preventDefault()

    var keywordObj = $(this).serializeArray()
    var keyword = keywordObj[0].value
    //var qString = `query=${keyword}`
    var qString = `q=${keyword}`
    var sort = `&sort_by=date&location.address=singapore`

    var finalUrl = `${apiUrl}${qString}${sort}${apiKey}`
    ajaxTextSearch(finalUrl, keyword)
  })

  function ajaxTextSearch (finalUrl, keyword) {
    $spinner.fadeIn()

    $.get(finalUrl).done(function (data) {
      $spinner.fadeOut()

      var results = data.events

      $keywordSearch.text(`Results for keyword: ${keyword}`)

      if ($searchResults.find('li').length) $searchResults.html('')

      results.forEach(function (event) {
        var $newLi = $('<li>')
        var $newH2 = $('<h2>')
        var $newP = $('<p>')
        var $newImg = $('<img>')
        var $newBr = $('<br>')

        var year = event.start.local.slice(0, 4)
        var month = event.start.local.slice(5, 7)
        var day = event.start.local.slice(8, 10)
        var monthJS = month - 1

        var hour = event.start.local.slice(11, 13)
        var minutes = event.start.local.slice(14, 16)
        var seconds = event.start.local.slice(17, 19)

        var d = new Date(year, monthJS, day, hour, minutes, seconds)

        var $addBttn = $(`<button class="addBttn"
          data-name="${event.name.text}"
          data-dateTime="${event.start.local}"
          data-imgUrl="${event.logo.url}"
          data-eventUrl="${d.toString()}"
        >add</button>`)

        $newH2.text(event.name.text)
        //$newP2.text(event.description.text)
        $newImg.attr('src', event.logo.url)

        $newP.text(d.toString())

        $newLi.append($newImg, $newH2, $newP, $addBttn, $newBr)

        $searchResults.append($newLi)
      })
    })
  }
})
