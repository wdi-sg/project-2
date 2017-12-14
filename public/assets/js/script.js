//for login
$(function() {

  $('#customer').show()

  $('#selectType').on('change', function() {
    if ($(this).val() === 'admin') {
      $("#customer").hide()
    } else {
      $("#admin").hide()
    }
    $("#" + $(this).val()).show()
  });

})
