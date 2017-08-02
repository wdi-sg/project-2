$(document).ready(function() {
var ctx = document.getElementById("myChart").getContext('2d')
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: 'upvotes',
      data: [upJan, upFeb, upMar, upApr, upMay, upJun, upJul, upAug, upSep, upOct, upNov, upDec],
      backgroundColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    },
      {
        label: 'downvotes',
        data: [downJan, downFeb, downMar, downApr, downMay, downJun, downJul, downAug, downSep, downOct, downNov, downDec],
        backgroundColor: 'rgba(255,99,132,1)',
        borderWidth: 1
      }],
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
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
        country: $(this).data('country')
      }
    }).done(function(data) {

      location.reload()
    })
  })
})
