$(document).ready(function () {
  var $form = $('#transact')
  var $buyInstrument = $('#buyInstrument')
  var $positionUl = $('#positionUl') // set at level of positionUl ensures newly ajax-added positions can be selected 
  var $instrumentsMenu = $('#instrumentsMenu')
  $('#positionsTable').DataTable({
        searching: false,
        ordering: false,
        select: false,
        paging: false
      })

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

          $('#tableBody').append(`<tr id="${newPosition.id}">
                                    <td>${newPosition.name}</td> 
                                    <td>${newPosition.quantity}</td>
                                    <td>${newPosition.unitCost}</td>
                                    <td><a id="sellPosition:${newPosition.id}" href="">Sell</a><td>
                                  </tr>`)


          // $('#positionUl').append(`<li id="${newPosition._id}">${newPosition.instrument.name} <a id="sellPosition:${newPosition._id}" href="">Sell</a></li>`)
          // <b>Name:</b> <b>Qty:</b> ${newPosition.quantity}, <b>Unit Cost:</b> ${newPosition.unitCost}

        }).fail(function (res) {
          console.log('error submitting buy selection')
        })
      }
        
  })


  $positionUl.on('click', `a[id*='sellPosition']` , function(event) {
        // console.log('click click')
        // window.setTimeout(function(){console.log('clearing...')}, 5000)
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
      
      // Ajax API call turned off 
      // # Ajax API call turned on
      
      $.ajax({
          url: '/home/eodMktPricing',
          type: 'POST',
          data: instrumentID
        }).done(function (res) {
          console.log('success getting market price thru backend')
          var parseRes = JSON.parse(res)

          // consider streamlining res data at server side before sending over

          var eodMktPrice = parseRes.dataset_data.data[0][4]
          var eodMktPriceDate = parseRes.dataset_data.data[0][0]
          console.log('price: ', eodMktPrice)
          console.log('date: ', eodMktPriceDate)
          $('#eodMktPricing').html(`End of Day Market Price (as of ${eodMktPriceDate}): \$${eodMktPrice} <br><i>Source: Quandl Inc.</i>`)

          // render price chart using MetricsGraphics
          var chartData = []
          if (parseRes.dataset_data.data.length < 252) {
            var num = parseRes.dataset_data.data.length
          } else {
            var num = 252
          }

          for (var i = 0; i < num; i++) {
            chartData[i] = {
              'date': new Date(parseRes.dataset_data.data[i][0]), 
              'price': parseRes.dataset_data.data[i][4]
            }
          }

          MG.data_graphic({
            title: "",
            //description: "End of Day Prices",
            data: chartData,
            width: 650,
            height: 300,
            target: '#graph',
            x_accessor: 'date',
            y_accessor: 'price',
            y_extended_ticks: true,
            min_y_from_data: true,
            //markers: [{'year': 1964, 'label': '"The Creeping Terror" released'}]
          })

        }).fail(function (res) {
          console.log('error getting market price thru backend')
        })

          
    }
  })
})
