$(function () {
  const $tvSearch = $('#tvSearch')
  const $searchResult = $('#searchResult')
  const $episodeList = $('#episodeList')

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

      if($searchResult.find('li').length) $searchResult.html('')

      results.forEach(function (listing) {
        var $newLi = $('<li>')
        var $newH2 = $('<h2>')
        var $newP = $('<p>')

        var $linkbttn = $(`<button class="linkbttn"
        onclick="window.location.href='episode/${listing.show.id}?showid=${listing.show.id}'"
        >Episodes</button>`)

        $newH2.text(listing.show.name)
        $newP.html(listing.show.summary)

        $newLi.append($newH2, $newP, $linkbttn)
        $searchResult.append($newLi)
      })
    })
  }

  function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1)
    var sURLVariables = sPageURL.split('&')

    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split('=')
      if (sParameterName[0] == sParam) {
        return decodeURIComponent(sParameterName[1])
      }
    }
  }

  var id = GetURLParameter('showid')
  var finalUrl = `http://api.tvmaze.com/shows/${id}/episodes`

  function episodeList() {
    $.get(finalUrl).done(function (data) {
      var results = data
      console.log(results)

      results.forEach(function (listing) {
        var $newLi = $('<li>')
        var $newH2 = $('<h2>')
        var $newP1 = $('<p>')
        var $newP2 = $('<p>')
        var $newP3 = $('<p>')
        var $newP4 = $('<p>')
        var $linkbttn = $(`<button class="addBttn"
          data-name="${listing.name}"
          data-id="${listing.id}"
          data-episode="${listing.number}"
          data-season ="${listing.season}"
        >Watched!</button>`)

        $newH2.text(listing.name)
        $newP1.text("Season: " + listing.season)
        $newP2.text("Episode: " + listing.number)
        $newP3.text("Airdate: " + listing.airdate)
        $newP4.html(listing.summary)

        $newLi.append($newH2, $newP1, $newP2, $newP3, $newP4, $linkbttn)
        $episodeList.append($newLi)
      })
    })
  }
  episodeList()

  $("#episodeList").on('click', '.addBttn', function (e) {
    e.preventDefault()
    var episodeInfo = e.currentTarget.dataset
    const theBttn = $(this)

    var newEpisode = {
      name: episodeInfo.name,
      id: episodeInfo.id,
      episodeNum: episodeInfo.episode,
      season: episodeInfo.season
    }

    $.post('/episode', newEpisode).done(function(data){
      console.log(data)
    })
  })
})
