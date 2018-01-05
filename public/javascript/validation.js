$(document).ready(function() {
  // checks for registration form
  $("#firstName").on("focusout", function() {
    if ($("#firstName").val() === "") {
      $("#firstName").addClass("is-danger");
      $("#firstNamePrompt").css("visibility", "visible");
    } else {
      $("#firstName").removeClass("is-danger");
      $("#firstName").addClass("is-success");
      $("#firstNamePrompt").css("visibility", "hidden");
    }
  });

  $("#lastName").on("focusout", function() {
    if ($("#lastName").val() === "") {
      $("#lastName").addClass("is-danger");
      $("#lastNamePrompt").css("visibility", "visible");
    } else {
      $("#lastName").removeClass("is-danger");
      $("#lastName").addClass("is-success");
      $("#lastNamePrompt").css("visibility", "hidden");
    }
  });

  $("#email").on("focusout", function() {
    if ($("#email").val() === "") {
      $("#email").addClass("is-danger");
      $("#emailPrompt").css("visibility", "visible");
    } else {
      $("#email").removeClass("is-danger");
      $("#email").addClass("is-success");
      $("#emailPrompt").css("visibility", "hidden");
    }
  });

  $("#username").on("focusout", function() {
    if ($("#username").val() === "") {
      $("#username").addClass("is-danger");
      $("#usernamePrompt").css("visibility", "visible");
    } else {
      $("#username").removeClass("is-danger");
      $("#username").addClass("is-success");
      $("#usernamePrompt").css("visibility", "hidden");
    }
  });

  $("#password").on("focusout", function() {
    if ($("#password").val() === "") {
      $("#password").addClass("is-danger");
      $("#passwordPrompt").css("visibility", "visible");
    } else {
      $("#password").removeClass("is-danger");
      $("#password").addClass("is-success");
      $("#passwordPrompt").css("visibility", "hidden");
    }
  });

  $("#passwordConfirm").on("focusout", function() {
    if ($("#passwordConfirm").val() === "") {
      $("#passwordConfirm").addClass("is-danger");
      $("#passwordConfirmPrompt").css("visibility", "visible");
    } else {
      $("#passwordConfirm").removeClass("is-danger");
      $("#passwordConfirm").addClass("is-success");
      $("#passwordConfirmPrompt").css("visibility", "hidden");
    }
  });
});
