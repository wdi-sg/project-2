document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

$(document).ready(function() {
  // event listener to add more input fields
  $(document).on("keyup", function() {
    var counter = $("form input").length;
    var addLogic = true;
    for (var i = 0; i < counter; i++) {
      if ($("#input" + i).val() === "") {
        addLogic = false;
      }
    }
    if (addLogic === true && counter < 10) {
      addInput(counter);
    }

    if (counter > 1) {
      removeInput(counter - 1);
    }
  });

  // function to add another input field
  var addInput = function(index) {
    $(".inputfield").append("<div class='field is-horizontal' id=field" + index + "></div>");
    $("#field" + index).append("<div class='field-label is-normal'></div>");
    $("#field" + index).children().append("<label class=label>Priority " + (index + 1) + "</label>").hide().fadeIn(800);

    $("#field" + index).append("<div class=field-body></div>");
    $("#field" + index).children(".field-body").append("<div class=field></div>");
    $("#field" + index).children(".field-body").children(".field").append("<div class=control id=control" + index + "></div>");
    $("#control" + index).append("<input class=input type=text name=entry" + index + " id=input" + index + ">").hide().fadeIn(800);
  };

  // event listener to remove extra input field
  var removeInput = function(index){
    $("#input" + index).on("keyup", function() {
      if ($("#input" + index).val() === "") {
        $("#field" + (index + 1)).fadeOut(800, function() {
          $(this).remove();
        });
      }
    });
  };
});
