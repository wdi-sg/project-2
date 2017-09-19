var ctx = document.getElementById('myChart').getContext('2d')
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

  $('#Up2').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/votes',
      data: {
        points: 1,
        month: 2,
        country: $(this).data('country')
      }
    }).done(function (data) {
      location.reload()
    })
  })

  $('#Up3').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/votes',
      data: {
        points: 1,
        month: 3,
        country: $(this).data('country')
      }
    }).done(function (data) {
      location.reload()
    })
  })

  $('#Up4').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/votes',
      data: {
        points: 1,
        month: 4,
        country: $(this).data('country')
      }
    }).done(function (data) {
      location.reload()
    })
  })

  $('#Up5').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/votes',
      data: {
        points: 1,
        month: 5,
        country: $(this).data('country')
      }
    }).done(function (data) {
      location.reload()
    })
  })

  $('#Up6').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/votes',
      data: {
        points: 1,
        month: 6,
        country: $(this).data('country')
      }
    }).done(function (data) {
      location.reload()
    })
  })

  $('#Up7').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/votes',
      data: {
        points: 1,
        month: 7,
        country: $(this).data('country')
      }
    }).done(function (data) {
      location.reload()
    })
  })

  $('#Up8').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/votes',
      data: {
        points: 1,
        month: 8,
        country: $(this).data('country')
      }
    }).done(function (data) {
      location.reload()
    })
  })

  $('#Up9').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/votes',
      data: {
        points: 1,
        month: 9,
        country: $(this).data('country')
      }
    }).done(function (data) {
      location.reload()
    })
  })

  $('#Up10').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/votes',
      data: {
        points: 1,
        month: 10,
        country: $(this).data('country')
      }
    }).done(function (data) {
      location.reload()
    })
  })

  $('#Up11').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/votes',
      data: {
        points: 1,
        month: 11,
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

$('#Down2').on('click', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/votes',
    data: {
      points: -1,
      month: 2,
      country: $(this).data('country')
    }
  }).done(function (data) {
    location.reload()
  })
})

$('#Down3').on('click', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/votes',
    data: {
      points: -1,
      month: 3,
      country: $(this).data('country')
    }
  }).done(function (data) {
    location.reload()
  })
})

$('#Down4').on('click', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/votes',
    data: {
      points: -1,
      month: 4,
      country: $(this).data('country')
    }
  }).done(function (data) {
    location.reload()
  })
})

$('#Down5').on('click', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/votes',
    data: {
      points: -1,
      month: 5,
      country: $(this).data('country')
    }
  }).done(function (data) {
    location.reload()
  })
})

$('#Down6').on('click', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/votes',
    data: {
      points: -1,
      month: 6,
      country: $(this).data('country')
    }
  }).done(function (data) {
    location.reload()
  })
})

$('#Down7').on('click', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/votes',
    data: {
      points: -1,
      month: 7,
      country: $(this).data('country')
    }
  }).done(function (data) {
    location.reload()
  })
})

$('#Down8').on('click', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/votes',
    data: {
      points: -1,
      month: 8,
      country: $(this).data('country')
    }
  }).done(function (data) {
    location.reload()
  })
})

$('#Down9').on('click', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/votes',
    data: {
      points: -1,
      month: 9,
      country: $(this).data('country')
    }
  }).done(function (data) {
    location.reload()
  })
})

$('#Down10').on('click', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/votes',
    data: {
      points: -1,
      month: 10,
      country: $(this).data('country')
    }
  }).done(function (data) {
    location.reload()
  })
})

$('#Down11').on('click', function (e) {
  e.preventDefault()
  $.ajax({
    method: 'POST',
    url: '/votes',
    data: {
      points: -1,
      month: 11,
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
