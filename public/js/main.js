$(function() {
  let socket = io()

  const $message = $("#message")
  const $messageList = $("#messages")
  const $task = $("#createTask")
  const userName = $("#userName").val()
  const userProject = $("#userProject").val()
  const userProjectId = $("#userProjectId").val()

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
  $task.submit(res => {
    socket.emit("task", {
      user: $("#taskUser").val(),
      project: $("#taskProject").val(),
      projectId: $("#taskProjectId").val(),
      taskName: $("#taskName").val(),
      taskAssigned: $("#taskAssigned").val(),
      taskStart: $("#taskStart").val(),
      taskEnd: $("#taskEnd").val(),
      projectedEnd: $("#projectedEnd").val()
    })
    $("#taskName").val("")
    $("#taskAssigned").val("")
    $("#taskStart").val("")
    $("#taskEnd").val("")
    $("#projectedEnd").val("")
    return false
  })
})
