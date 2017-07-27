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
      
      //console.log($instrumentsMenu.children("option").filter(":selected").val‌​())
      //console.log($form)
      
      //var $formData = $form["0"]["0"].value
      //.serializeArray()
      //console.log('aaaa', typeof($formData))

      if (id !== '') { // only make ajax req is id not null

        var instrumentID = {instrumentID: id}
        console.log('instrumentID ', instrumentID)

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

          $('#positionUl').append(`<li id="${newPosition._id}">${newPosition.instrument.name} <a id="sellPosition:${newPosition._id}" href="">Sell</a></li>`)

          // <b>Name:</b> <b>Qty:</b> ${newPosition.quantity}, <b>Unit Cost:</b> ${newPosition.unitCost}

        }).fail(function (res) {
          console.log('error submitting buy selection')
        })
      }
        
  })


  $positionUl.on('click', `a[id*='sellPosition']` , function(event) {

        event.preventDefault()

        var positionID = {positionID: event.target.id.substring(13)}

        console.log(event.target.id)
        console.log(event.target.id.substring(13))

        $.ajax({
          url: '/home/sellPosition',
          type: 'POST',
          data: positionID,
        }).done(function (res) {
          console.log('success submitting sell selection')
          console.log('deletedId', res.deletedId)

          var element = '#' + res.deletedId
          $(element).remove()

        }).fail(function (res) {
          console.log('error submitting sell selection')
        })



  }) 


  $instrumentsMenu.change(function (event) {
    event.preventDefault()
    var id = $('#instrumentsMenu option:selected').val()

    $('#eodMktPricing').html('') // clears listing while waiting for res

    if (id !== '') { // send ajax req only if instrument is selected

      $('#eodMktPricing').html(

        `Downloading price...<img src="http://static.spotapps.co/assets/widgets/loading.gif" style="width:20px;height:20px;">`)

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
          $('#eodMktPricing').html(`End of Day Market Price (as of ${eodMktPriceDate}): \$${eodMktPrice} <br><i>Source: Quandl Inc.</i>`)
        }).fail(function (res) {
          console.log('error getting market price thru backend')
        })
    }
  })



})
