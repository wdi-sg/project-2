$(function() {
  let socket = io()

  const $message = $("#message")
  const $messageList = $("#messages")
  const $mainBoard = $(".mainBoard")
  const $task = $("#createTask")
  const $create = $("#create")
  const $taskItem = $mainBoard.find(".taskItem")
  const userName = $("#userName").val()
  const userProject = $("#userProject").val()
  const userProjectId = $("#userProjectId").val()

  // project based connection
  let nsp = io(`/${userProjectId}`)

  let clicked = false
  let clickedId = ""
  let currentPosition = "create"
  let newPosition = ""
  //id = create , review , return

  $("body").on("click", ".taskItem", e => {
    if (!clicked) {
      clickedId = e.target.id
      $jTarget = $("body").find("#" + clickedId)
      $jTarget.css({
        border: "2px solid red"
      })
      clicked = true
      // socket.emit("update", {
      //   id: clickedId
      // })
    }
  })

  $("body").on("click", ".boardElement", e => {
    // console.log(newPosition)
    newPosition = e.target.id
    if (clicked && newPosition === "review") movePosition()
    else if (clicked && newPosition === "return") movePosition()
    else if (clicked && newPosition === "create") movePosition()
  })

  const movePosition = () => {
    let $childDiv = $("body").find("#" + clickedId)
    let $parentDiv = $("body").find("#" + newPosition)
    currentPosition = newPosition
    $parentDiv.append($childDiv)
    clicked = false
    $("body")
      .find("#" + clickedId)
      .css({
        border: "2px solid blue"
      })
  }

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
  nsp.on("task", task => {
    //
    let $item = $("<div class='taskItem'>")
    let $taskName = $()

    $create.prepend($("<div>").text(task.name))
  })
})
