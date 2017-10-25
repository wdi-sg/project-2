const $message = $("#message")
const userName = $("#userName").val()

$(function() {
  let socket = io()
  $message.submit(function() {
    socket.emit("chat message", {
      message: $("#m").val(),
      user: userName
    })
    $("#m").val("")
    return false
  })
  socket.on("chat message", function(msg) {
    $("#messages").append($("<li>").text(userName + ": " + msg))
  })
})
