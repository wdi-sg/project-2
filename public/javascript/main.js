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


  // event listener to toggle between results
  $(".search").on("click", function() {
    $(".searchresult-container").fadeIn(800).css("display", "block");
    $(".analyzedresult-container").fadeOut(800).css("display", "none");
    $(".savedresult-container").fadeOut(800).css("display", "none");
    $(".search").addClass("is-active");
    $(".analyze").removeClass("is-active");
    $(".saved").removeClass("is-active");

    $(".search-container").fadeIn(800).css("display", "block");
    $(".analyzed-container").fadeOut(800).css("display", "none");
  });


  $(".analyze").on("click", function() {
    $(".searchresult-container").fadeOut(800).css("display", "none");
    $(".analyzedresult-container").fadeIn(800).css("display", "block");
    $(".savedresult-container").fadeOut(800).css("display", "none");
    $(".search").removeClass("is-active");
    $(".analyze").addClass("is-active");
    $(".saved").removeClass("is-active");

    $(".search-container").fadeOut(800).css("display", "none");
    $(".analyzed-container").fadeIn(800).css("display", "block");
  });


  $(".saved").on("click", function() {
    $(".searchresult-container").fadeOut(800).css("display", "none");
    $(".analyzedresult-container").fadeOut(800).css("display", "none");
    $(".savedresult-container").fadeIn(800).css("display", "block");
    $(".search").removeClass("is-active");
    $(".analyze").removeClass("is-active");
    $(".saved").addClass("is-active");
  });


  // event listener for flash messages
  $(".delete").on("click", function() {
    $(".flash").fadeOut(800);
  });

  setTimeout(function() {
    $(".flash").fadeOut(800);
  }, 1500);


  // ajax request to handle delete request from anchor tags
  $(".delete-search").on("click", function(e) {
    e.preventDefault();
    var id = $(this).data("id");
    $("#" + id).fadeOut(800);

    $.ajax({
      url: '/delete/search/' + id,
      type: 'delete',
      success: function(data) {
        console.log(data);
      },
      error: function(data) {
        console.log(data);
      }
    });
  });


  $(".delete-analyzed").on("click", function(e) {
    e.preventDefault();
    var id = $(this).data("id");
    $("#" + id).fadeOut(800);

    $.ajax({
      url: '/delete/analyzed/' + id,
      type: 'delete',
      success: function(data) {
        console.log(data);
      },
      error: function(data) {
        console.log(data);
      }
    });
  });


  $(".delete-saved").on("click", function(e) {
    e.preventDefault();
    var id = $(this).data("id");
    $("#" + id).fadeOut(800);

    $.ajax({
      url: '/delete/saved/' + id,
      type: 'delete',
      success: function(data) {
        console.log(data);
      },
      error: function(data) {
        console.log(data);
      }
    });
  });


  // ajax request to handle post request when user chooses combinations to save
  $(".analyzedsave").on("click", function(e) {
    e.preventDefault();
    var user = $(this).data("id");
    var range = $(this).data("range");
    // console.log(range);
    var search = $(this).parent().prev()[0].innerText;

    if ($(this).hasClass("saved")) {
      // if a particular combination has been saved
      $.ajax({
        url: '/update/analyzed/' + user,
        type: 'post',
        data: {'item': search, 'range': range},
        success: function(data) {
          console.log(data);
        },
        error: function(data) {
          console.log(data);
        }
      });

      $(this).children("span").remove();
      $(this).append("<span class='icon has-text-danger'></span>");
      $(this).children("span").append("<i class='fa fa-ban'></i>");
      $(this).removeClass("saved");
    } else {
      // if a particular combination has not been saved
      // obtaining information from rendered page
      var indivArray = $(this).children("p");
      var locationArray = [];
      // console.log(indivArray[0].innerText);
      for (var element = 0; element < (indivArray.length / 3); element++) {
        var location = {
          name: indivArray[element * 3].innerText,
          address1: indivArray[element * 3 + 1].innerText,
          address2: indivArray[element * 3 + 2].innerText,
        };
        locationArray.push(location);
      }
      // console.log(locationArray);

      $.ajax({
        url: '/save/analyzed/' + user,
        type: 'post',
        data: {'item': search, 'sortedList': locationArray, 'range': range},
        success: function(data) {
          console.log(data);
        },
        error: function(data) {
          console.log(data);
        }
      });

      $(this).children("i").css("display", "none");
      $(this).children("span").remove();
      $(this).append("<span class='icon has-text-success'></span>");
      $(this).children("span").append("<i class='fa fa-check-square'></i>");
      $(this).addClass("saved");
    }
  });


  // ajax request to handle request when user deletes saved combinations
  $(".analyzeddelete").on("click", function(e) {
    e.preventDefault();
    var user = $(this).data("id");
    var range = $(this).data("range");
    var searchTerm = $(this).parent().prev()[0].innerText;
    // additional spacing due to anchor tag
    var search = searchTerm.slice(0, searchTerm.length - 1);

    $.ajax({
      url: '/update/analyzed/' + user,
      type: 'post',
      data: {'item': search, 'range': range},
      success: function(data) {
        console.log(data);
      },
      error: function(data) {
        console.log(data);
      }
    });

    $(this).fadeOut(800);
  });


  // navbar jquery only method
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call($('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $($el).on('click', function () {

        // Get the target from the "data-target" attribute
        var target = $($el).data("target");
        var $target = $("#" + target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $($el).toggleClass('is-active');
        $target.slideToggle("fast");
        $target.toggleClass('is-active');
      });
    });
  }
});


// navbar javascript method from Bulma documentation
// document.addEventListener('DOMContentLoaded', function () {
//
//   // Get all "navbar-burger" elements
//   var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
//
//   // Check if there are any navbar burgers
//   if ($navbarBurgers.length > 0) {
//
//     // Add a click event on each of them
//     $navbarBurgers.forEach(function ($el) {
//       $el.addEventListener('click', function () {
//
//         // Get the target from the "data-target" attribute
//         var target = $el.dataset.target;
//         var $target = document.getElementById(target);
//
//         // Toggle the class on both the "navbar-burger" and the "navbar-menu"
//         $el.classList.toggle('is-active');
//         $("#navMenu").slideToggle("fast");
//         $target.classList.toggle('is-active');
//       });
//     });
//   }
// });
