$(function () {
  const $tvSearch = $('#tvSearch')
  const $searchResult = $('#searchResult')
  const $episodeList = $('#episodeList')

  // $tvSearch.on('click', function (e) {
  //   e.preventDefault()
  //
  //   location.href=''
  //
  // })
  function show (req, res) {
    var showId = req.params.id
    var finalUrl = `http://api.tvmaze.com/search/shows?${showId}`

    $.get(finalUrl).done(function (data) {
      var results = data
      console.log(results)
    })
  }

  // function allEpisodes (finalUrl, keyword) {
  //   var showId = req.params.id
  //   var finalUrl = `http://api.tvmaze.com/search/shows?${showId}`
  //   $.get(finalUrl).done(function (data) {
  //     var results = data
  //
  //     console.log(results)
  //   })
  // }

  $tvSearch.on('submit', function (e) {
    e.preventDefault()

    var keywordObj = $(this).serializeArray()
    var keyword = keywordObj[0].value
    var qString = `q=${keyword}`
    var finalUrl = `http://api.tvmaze.com/search/shows?${qString}`

    ajaxTextSearch(finalUrl, keyword)
  })

  function ajaxTextSearch (finalUrl, keyword) {
    $.get(finalUrl).done(function (data) {
      var results = data

      // console.log(results)

      if($searchResult.find('li').length) $searchResult.html('')


      results.forEach(function (listing) {
        var $newLi = $('<li>')
        var $newH2 = $('<h2>')
        var $newP = $('<p>')

        var $linkbttn = $(`<button class="linkbttn"
        onclick="window.location.href='episode/${listing.show.id}'"
        >Episodes</button>`)

        $newH2.text(listing.show.name)
        $newP.html(listing.show.summary)

        $newLi.append($newH2, $newP, $linkbttn)
        $searchResult.append($newLi)
      })
    })
  }
})
