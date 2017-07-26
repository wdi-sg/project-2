$(document).ready(function () {
  var $form = $('#transact')
  var $buyInstrument = $('#buyInstrument')
  var $instrumentsMenu = $('#instrumentsMenu')

//   //var $tbody = $('tbody')
//   var $selectETF = $('#selectETF')
      //console.log($buyInstrument)

      //console.log($instrumentsMenu.val())
      //console.log($instrumentsMenu.text())

  $buyInstrument.on('click', function(event) { //'#buyInstrument'
      event.preventDefault() // prevents refresh of page
      
      //console.log($('#instrumentsMenu option:selected').val())

      // var instrumentID = {
      //   instrumentID: $('#instrumentsMenu option:selected').val()
      // }
      var id = $('#instrumentsMenu option:selected').val()
      var instrumentID = {instrumentID: id}

      //console.log($instrumentsMenu.children("option").filter(":selected").val‌​())
      //console.log($form)
      console.log('instrumentID ', instrumentID)

      //var $formData = $form["0"]["0"].value
      //.serializeArray()
      //console.log('aaaa', typeof($formData))

        $.ajax({
          url: '/home',
          type: 'POST',
          data: instrumentID,
        }).done(function (res) {
          console.log('success submitting buy selection')
          console.log('xx', res.savedPosition)
          var newPosition = res.savedPosition
          // console.log(newPosition._id)
          // console.log(newPosition.instrument.name)
          // console.log(newPosition.quantity)
          // console.log(newPosition.unitCost)

          $('#positionUl').append(`<li id="${newPosition._id}"><b>Name:</b> ${newPosition.instrument.name}, <b<b>Qty:</b> ${newPosition.quantity}, <b>Unit Cost:</b> ${newPosition.unitCost}<a id="sellInstrument:${newPosition._id}" href="">Sell</a></li>`)

        }).fail(function (res) {
          console.log('error submitting buy selection')
        })
  })
})
