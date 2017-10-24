const express = require("express")
const router = express.Router()

const Thread = require('../models/threads')
const Answer = require("../models/answers")

router.post('/', function (req, res) {
  console.log(req.body)
  let newAnswer = new Answer({
    description: req.body.userinput,
    parent: req.body.id,
    creator: req.user.id
  })
  newAnswer.save()
  .then(()=>{
    res.redirect(`/thread/${req.body.id}`)
  })

})

router.delete("/:id", (req,res)=>{
  console.log(req);
  Answer.findByIdAndRemove(req.params.id)
  .then(() => res.redirect(`/profile`))
  .catch(err => console.log(err))
})

module.exports = router
