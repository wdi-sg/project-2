const $message = $("#message")
const userName = $("#userName").val()
const userProject = $("#userProject").val()

$(function() {
  let socket = io()
  $message.submit(res => {
    socket.emit("chat message", {
      message: $("#m").val(),
      user: userName,
      project: userProject
    })
    $("#m").val("")
    return false
  })
  let nsp = io(`/${userProject}`)
  nsp.on("chat message", function(msg) {
    $("#messages").append($("<li>").text(msg.user + ": " + msg.message))
  })
})
