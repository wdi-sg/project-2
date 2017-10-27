$(function(){


  if($.fn.cloudinary_fileupload !== undefined) {
    $("input.cloudinary-fileupload[type=file]").cloudinary_fileupload();
  }

  // $bookmarkForm.on('submit', function (e) {
  //     e.preventDefault()
  //
  //     var form = $(this)
  //     var formData = form.serializeArray()
  //     var patternId = formData[0].value
  //     var json = JSON.stringify({
  //       restoId
  //     })
  //
  //     console.log(`delete this resto ${restoId}`)
  //     console.log(json)
  //
  //     fetch('/search', {
  //     method: 'PUT',
  //     body: json,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(response => response.json()) // convert the json file into js object
  //   .then(showResults) // at this point we got the data
  //   .catch(err => console.log(err))
  //   })
  //
  //
  //
  //
  //
  //
















})
