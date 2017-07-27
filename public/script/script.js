$(document).ready(function () {
  var $form = $('#transact')
  var $buyInstrument = $('#buyInstrument')
  var $positionUl = $('#positionUl') // set at level of positionUl ensures newly ajax-added positions can be selected 
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

      // *** TO CHECK IF ID = NULL. ONLY PASS AJAX IF ID NOT NULL. ***

        $.ajax({
          url: '/home/addPosition',
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


//"a[id*=\'sellInstrument\`]"
        // var aaa = 
        // console.log(aaa)

  $positionUl.on('click', `a[id*='sellInstrument']` , function(event) {

        event.preventDefault()

        console.log(event.target.id)

        // $.ajax({
        //   url: '/home/sellPosition',
        //   type: 'POST',
        //   data: event.target.id,
        // }).done(function (res) {
        //   console.log('success submitting sell selection')
        //   console.log('xx', res.savedPosition)
        //   var newPosition = res.savedPosition

        //   // console.log(newPosition._id)
        //   // console.log(newPosition.instrument.name)
        //   // console.log(newPosition.quantity)
        //   // console.log(newPosition.unitCost)

        //   $('#positionUl').append(`<li id="${newPosition._id}"><b>Name:</b> ${newPosition.instrument.name}, <b<b>Qty:</b> ${newPosition.quantity}, <b>Unit Cost:</b> ${newPosition.unitCost}<a id="sellInstrument:${newPosition._id}" href="">Sell</a></li>`)

        // }).fail(function (res) {
        //   console.log('error submitting sell selection')
        // })



  }) 

console.log('aqaq', $positionUl)


  $instrumentsMenu.change(function (event) {
    event.preventDefault()
    var id = $('#instrumentsMenu option:selected').val()

    $('#eodMktPricing').html('') // clears listing while waiting for res

    if (id !== '') { // send ajax req only if instrument is selected

      var instrumentID = {instrumentID: id}
      
      $.ajax({
          url: '/home/eodMktPricing',
          type: 'POST',
          data: instrumentID,
        }).done(function (res) {
          console.log('success getting market price thru backend')
          var parseRes = JSON.parse(res)
          var eodMktPrice = parseRes.dataset_data.data[0][4]
          var eodMktPriceDate = parseRes.dataset_data.data[0][0]
          console.log('price: ', eodMktPrice)
          console.log('date: ', eodMktPriceDate)
          $('#eodMktPricing').html(`End of Day Market Price (as of ${eodMktPriceDate}): \$${eodMktPrice}`)
        }).fail(function (res) {
          console.log('error getting market price thru backend')
        })
    }
  })



})
