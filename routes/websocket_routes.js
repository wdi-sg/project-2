const Message = require("../models/message")
const Task = require("../models/task")

module.exports = io => {
  io.on("connection", function(socket) {
    // console.log("someone connected")
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
      // console.log("connected?")

      let nsp = io.of(`/${task.projectId}`)
      nsp.emit("task", {
        name: task.taskName,
        assigned: task.taskAssigned
      })
      // console.log(task)
      let newTask = new Task({
        name: task.taskName,
        projectId: task.projectId,
        assigned: task.taskAssigned,
        start: task.taskStart,
        end: task.taskEnd,
        projectedEnd: task.projectedEnd
      })

      newTask.save()
      // console.log(newTask)
    })

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

    socket.on("delete", deleteId => {
      console.log(deleteId)
    })
  })
}
