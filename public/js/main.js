const $message = $("#message")
const $userName = $("#userName").val()

$(function() {
  let socket = io()
  $message.submit(function() {
    // console.log("message form pressed")
    socket.emit("chat message", $("#m").val())
    $("#m").val("")
    return false
  })
  socket.on("chat message", function(msg) {
    $("#messages").append($("<li>").text($userName + ": " + msg))
  })
})
