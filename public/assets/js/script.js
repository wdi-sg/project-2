// $(function (){
//   const quandl_url = "https://www.quandl.com/api/v3/datasets/EOD/V.json?api_key=wYuyd3EWeAkrEtVsNE8Q"
//   var $result = $('#result')
//   $.get(quandl_url)
//     .done(function(data) {
//       const result = data.dataset.data[0][4]
//       $result.text(result)
//     })
// })
var values = []
var dataSet = []
var labels = []
$('#assetClassTable td').each(function(){
  var cellText= $(this).html()
  values.push(cellText)

})
for (var i=0; i < values.length; i++){
  if (i % 2 === 0){
    labels.push(values[i])
  }
  else {
    dataSet.push(parseInt(values[i]))
  }
}
console.log(dataSet);
console.log(labels);


var ctx = document.getElementById("myChart").getContext('2d');
ctx.height= 20
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: '',
            data: dataSet,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      cutoutPercentage: 40,
      maintainAspectRatio: false,

    }
});
