$(function () {
  $(".add").click(function() {
    $("form > div:first-child").clone(true).insertBefore("form > div:last-child");
    return false;
  });

  $(".remove").click(function() {
      $(this).parent().remove();
  });
})
