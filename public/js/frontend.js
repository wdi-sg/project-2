$(document).ready(function() {
  console.log('js file is connected')
  $(".dropdown-button").dropdown()
  $('#textarea1').val('New Text');
  $('#textarea1').trigger('autoresize');
  $('select').material_select();

})
