module.exports = io => {
  io.on("connection", function(socket) {
    console.log("someone connected")
    socket.on("chat message", msg => {
      // console.log(msg.user + ": " + msg.message)
      let nsp = io.of(`/${msg.project}`)
      nsp.emit("chat message", {
        user: msg.user,
        message: msg.message
      })
      // console.log(msg)
    })
  })
}
