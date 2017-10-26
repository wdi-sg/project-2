const Message = require("../models/message")

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
  })
}
