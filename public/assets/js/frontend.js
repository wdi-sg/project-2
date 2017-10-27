$(function () {
  const $deleteForm = $('.deleteForm')

  $deleteForm.on('submit', function (e) {
    e.preventDefault()

    var form = $(this)
    var formData = form.serializeArray()
    var mediId = formData[0].value
    var json = JSON.stringify({
      mediId
    })

    fetch('/deletemedication', {
      method: 'DELETE',
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log('manipulate the dom now')
      form.parents('.col-4').remove()
    })
  })
})
