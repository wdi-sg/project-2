let comments = false

$('#hide-comments').click(() => {
  $('#comments').css('right', '-500px')
  comments = false
})

$('#show-comments').click(() => {
  if (!comments) {
    $('#comments').css('right', '0')
    comments = true
  } else {
    $('#comments').css('right', '-500px')
    comments = false
  }
})