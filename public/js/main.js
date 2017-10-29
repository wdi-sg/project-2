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
  const $button = $("button")

  // project based connection
  let nsp = io(`/${userProjectId}`)

  let clicked = false
  let clickedId = ""
  let currentPosition = "create"
  let newPosition = ""

  $("body").on("click", ".taskItem", e => {
    if (!clicked) {
      clickedId = e.target.id
      $jTarget = $("body").find("#" + clickedId)
      $jTarget.children().removeClass("yellow")
      $jTarget.children().addClass("orange")

      clicked = true
    }
  })

  $("body").on("click", ".boardElement", e => {
    newPosition = e.target.id
    if (clicked && newPosition === "review") movePosition()
    else if (clicked && newPosition === "return") movePosition()
    else if (clicked && newPosition === "create") movePosition()
  })

  $("body").on("click", ".delBtn", function() {
    // console.log("clicked")
    let targetId = $(this)
      .parents()
      .eq(1)
      .attr("id")
    // $("body")
    //   .find("#" + targetId)
    //   .remove()
    let projectId = $("#taskProjectId").val()
    socket.emit("delete", {
      targetId: targetId,
      projectId: projectId
    })
  })

  nsp.on("deleteThis", targetId => {
    $("body")
      .find("#" + targetId.targetId)
      .remove()
  })

  const movePosition = () => {
    clicked = false
    let $movedId = $("body")
      .find("#" + clickedId)
      .children()
    $movedId.removeClass("orange")
    $movedId.addClass("yellow")

    socket.emit("update", {
      clickedId: clickedId,
      newPosition: newPosition,
      projectId: userProjectId
    })
  }

  nsp.on("updateThis", update => {
    let $childDiv = $("body").find("#" + update.clickedId)
    let $parentDiv = $("body").find("#" + update.newPosition)
    currentPosition = update.newPosition

    if ($parentDiv.attr("id") === "return") {
      $childDiv.removeClass("s6")
      $childDiv.addClass("s3")
    } else if (
      $parentDiv.attr("id") === "create" ||
      $parentDiv.attr("id") === "review"
    ) {
      $childDiv.removeClass("s3")
      $childDiv.addClass("s6")
    }
    //moves the child div to new position
    $parentDiv.append($childDiv)
  })

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
    // if ($messageList.children().length > 9) {
    //   $messageList.find(":first-child").remove()
    // }

    let $messageString = `<li class='flow-text chatMessage'><b>${msg.user}:</b></li>`

    $messageList.append(
      $(
        `<li class='flow-text chatMessage'><strong>${msg.user}:</strong> ${msg.message}</li>`
      )
    )
  })

  //task creation
  $task.submit(res => {
    // console.log($("#taskDescription").val())
    socket.emit("task", {
      user: $("#taskUser").val(),
      project: $("#taskProject").val(),
      projectId: $("#taskProjectId").val(),
      taskName: $("#taskName").val(),
      taskDescription: $("#taskDescription").val(),
      taskAssigned: $("#taskAssigned").val(),
      // taskStart: $("#taskStart").val(),
      taskEnd: $("#taskEnd").val()
      // projectedEnd: $("#projectedEnd").val()
    })
    $("#taskName").val("")
    $("#taskDescription").val("")
    $("#taskAssigned").val("")
    // $("#taskStart").val("")
    $("#taskEnd").val("")
    // $("#projectedEnd").val("")
    return false
  })
  nsp.on("task", task => {
    //adds task to board
    let $item = $("<div class='taskItem col s6'>")
    let $card = $("<div class='card yellow lighten-3 z-depth-3'>")

    let $name = $("<h5> ")
    let $description = $("<p>")
    let $assigned = $("<p>")
    let $end = $("<p>")
    let $delBtn = $(
      `<button type="button" name="delButton" class="delBtn btn waves-effect waves-light">Delete</button>`
    )

    $name.text("Task: " + task.name)
    $description.text(task.description)
    $assigned.text("Assigned to: " + task.assigned)
    $end.text("Required: " + task.end)

    $card.append($name)
    $card.append($description)
    $card.append($assigned)
    $card.append($end)
    $card.append($delBtn)

    $item.append($card)

    $item.attr("id", task.id)

    $create.append($item)
  })

  $(".modal").modal()

  //inline-editable (taken from https://codepen.io/clemsos/pen/YWYRaL)
  $(".inline-editable").hover(
    function() {
      $(this).addClass("editHover")
    },
    function() {
      $(this).removeClass("editHover")
    }
  )

  let oldText, newText

  $(".inline-editable").bind("click", replaceHTML)

  function replaceHTML() {
    if (!$(".editing").length) {
      oldText = $(this).html()
      $(this).addClass("editing")
      var form = createForm(oldText)
      $(this)
        .html("")
        .html(form)
      $(this).unbind("click", replaceHTML)
    }
  }

  function createForm(text) {
    var form = '<form class="inline-editor">'
    form += '<input type="text" class="editBox" value="'
    form += oldText
    form += '" /> </form>'
    form += '<a href="#" class="btnSave white-text btn ">Save</a>'
    form += '<a href="#" class="btnDiscard">Cancel</a>'
    return form
  }

  $(document.body).on("click", ".btnDiscard", function() {
    $(this)
      .parent()
      .html(oldText)
    $(".inline-editable").removeClass("editing")
    $(".inline-editable").bind("click", replaceHTML)
    $(".inline-editable").removeClass("editHover")
  })

  $(document.body).on("click", ".btnSave", function() {
    newText = $(this)
      .parent()
      .find(".editBox")
      .val()
    saveChanges(this, newText)
  })

  function saveChanges(div, newText) {
    // get data for DB
    var id = $(div)
      .parent()
      .attr("id")
    var dataToUpdate = { id: id, text: newText }
    console.log(dataToUpdate)

    $(".inline-editable").removeClass("editing")
    $(div)
      .parent()
      .html(newText)
    $(".inline-editable").bind("click", replaceHTML)
    $(".inline-editable").removeClass("editHover")
  }
  //end inline-editable
})
