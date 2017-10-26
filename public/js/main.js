const $message = $("#message")
const $task = $("createTask")
const userName = $("#userName").val()
const userProject = $("#userProject").val()
const userProjectId = $("#userProjectId").val()

$(function() {
  let socket = io()

  //chat path
  $message.submit(res => {
    socket.emit("chat message", {
      message: $("#m").val(),
      user: userName,
      project: userProject,
      projectId: userProjectId
    })
    $("#m").val("")
    return false
  })
  let nsp = io(`/${userProjectId}`)
  nsp.on("chat message", function(msg) {
    $("#messages").append($("<li>").text(msg.user + ": " + msg.message))
  })

  //task creation
})
