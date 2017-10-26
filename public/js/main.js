const $message = $("#message")
const $messageList = $("#messages")
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
    if ($messageList.children().length > 9) {
      $messageList.find(":first-child").remove()
    }
    $messageList.append($("<li>").text(msg.user + ": " + msg.message))
  })

  //task creation
})
