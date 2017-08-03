var ctx = document.getElementById("myChart").getContext('2d')
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: 'Upvotes',
      data: [upJan, upFeb, upMar, upApr, upMay, upJun, upJul, upAug, upSep, upOct, upNov, upDec],
      backgroundColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    },
      {
        label: 'Downvotes',
        data: [downJan, downFeb, downMar, downApr, downMay, downJun, downJul, downAug, downSep, downOct, downNov, downDec],
        backgroundColor: 'rgba(255,99,132,1)',
        borderWidth: 1
      }],
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  }
})

  $('#Up1').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/votes',
      data: {
        points: 1,
        month: 1,
        country: $(this).data('country')
      }
    }).done(function (data) {
      location.reload()
    })
  })

  $('#Down1').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/votes',
      data: {
        points: -1,
        month: 1,
        country: $(this).data('country')
      }
    }).done(function (data) {
      location.reload()
    })
  })

  $('#Up12').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/votes',
      data: {
        points: 1,
        month: 12,
        country: $(this).data('country')
      }
    }).done(function (data) {
      location.reload()
    })
  })

  $('#Down12').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/votes',
      data: {
        points: -1,
        month: 12,
        country: $(this).data('country')
      }
    }).done(function (data) {
      location.reload()
    })
  })
