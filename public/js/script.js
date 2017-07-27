$(document).ready(function() {
  $('#Up1').on('click', function (e) {
    e.preventDefault()

    $.ajax({
      method: 'PUT',
      url: '/country',
      data: {}
    }).done(function (data) {
      // get data returned from the PUT route
      console.log(data)
    })
  })
})
