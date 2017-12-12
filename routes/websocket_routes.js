const Message = require("../models/message")
const Task = require("../models/task")

module.exports = io => {
  io.on("connection", function(socket) {
    socket.on("chat message", msg => {
      //send to other users with same projectId
      let nsp = io.of(`/${msg.projectId}`)
      nsp.emit("chat message", {
        user: msg.user,
        message: msg.message
      })

      //save to mongoose
      let newMessage = new Message({
        author: msg.user,
        content: msg.message,
        projectId: msg.projectId,
        date: Date.now()
      })
      newMessage.save()
    })

    socket.on("task", task => {
      let nsp = io.of(`/${task.projectId}`)

      //create a new task
      let newTask = new Task({
        name: task.taskName,
        projectId: task.projectId,
        description: task.taskDescription,
        assigned: task.taskAssigned,
        end: task.taskEnd
      })

      newTask.save().then(newTask => {
        nsp.emit("task", {
          id: newTask.id,
          name: newTask.name,
          description: newTask.description,
          assigned: newTask.assigned,
          end: newTask.dateSlug
        })
      })
    })

    //updates task card section
    socket.on("update", update => {
      let updateValue = "0"
      if (update.newPosition === "review") updateValue = "1"
      else if (update.newPosition === "return") updateValue = "2"

      Task.findByIdAndUpdate(update.clickedId, {
        status: updateValue
      })
        .then(() => {
          console.log("done")
        })
        .catch(err => console.log(err))

      let nsp = io.of(`/${update.projectId}`)
      nsp.emit("updateThis", {
        clickedId: update.clickedId,
        newPosition: update.newPosition
      })
    })

    //delete a task card
    socket.on("delete", targetId => {
      let nsp = io.of(`/${targetId.projectId}`)

      nsp.emit("deleteThis", {
        targetId: targetId.targetId
      })
      Task.findByIdAndRemove(targetId.targetId).then(() => {
        console.log("removed")
      })
    })
  }) //end of connection
}
