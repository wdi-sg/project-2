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

          $('#tableBody').append(`<tr id="${newPosition._id}">
                                    <td>${newPosition.instrument.name}</td> 
                                    <td>${newPosition.quantity}</td>
                                    <td>${newPosition.unitCost}</td>
                                    <td><a id="sellPosition:${newPosition._id}" href="">Sell</a><td>
                                  </tr>`)


          // $('#positionUl').append(`<li id="${newPosition._id}">${newPosition.instrument.name} <a id="sellPosition:${newPosition._id}" href="">Sell</a></li>`)
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

    /////////////
    //test graph
    ///////////////

// d3.json('eod_voo.json', function(data)  {
   
    //res.send(data)

    //console.log(data.dataset.data)
    //console.log($('body'))
//console.log(data)
  //$(document).replaceWith(data) //data
   
//document.body
// console.log('data length: ', data.dataset.data.length)
// console.log('datapoint date: ', data.dataset.data[0][0])
// console.log('datapoint price: ', data.dataset.data[0][4])


// var arrData = data.dataset.data
// var chartData = []

// function objectifyForm(formArray) {//serialize data function

//   var returnArray = {};
//   for (var i = 0; i < formArray.length; i++){
//     returnArray[formArray[i]['name']] = formArray[i]['value'];
//   }
//   return returnArray;
// }


  // for (var i = 0; i < arrData.length; i++) {
  //   chartData[i] = {
  //     'date': new Date(arrData[i][0]), 
  //     'price': arrData[i][4]
  //   }
  // }


// console.log(chartData[0])
// console.log(chartData[1])
// console.log(chartData[2])
// console.log(chartData[3])
// console.log(chartData[4])

// issue with jquery loaded on various HTML/handlebars. works only if one loaded.


 // var edata = [
 //      {'date':new Date('2014-11-01'),'value':12},
 //      {'date':new Date('2014-11-02'),'value':18},
 //      {'date':new Date('2014-11-03'),'value':20}
 //    ]

    // for data downloaded by API, probably need to regenerate as array of objects

    // MG.data_graphic({
    //     title: "iShares Core S&P 500 ETF",
    //     //description: "End of Day Prices",
    //     data: chartData, //data.dataset.data,
    //     width: 650,
    //     height: 300,
    //     target: '#graph',
    //     x_accessor: 'date',
    //     y_accessor: 'price'
    //     //markers: [{'year': 1964, 'label': '"The Creeping Terror" released'}]
    // })

// })

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
