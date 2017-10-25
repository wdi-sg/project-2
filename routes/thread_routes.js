const express = require("express")
const router = express.Router()

const Answer = require("../models/answers")
const Thread = require('../models/threads')
const User = require("../models/user")



router.delete("/:id", (req,res)=>{
  Thread.findByIdAndRemove(req.params.id)
  .then(()=>{
    Answer.remove({parent: req.params.id})
    .then(() => res.redirect(`/profile`))
    .catch(err => console.log(err))
  })
  })

  router.get(`/:id`, (req, res) => {
    Thread.findById({_id: req.params.id})
    .then(thread=>{
      Answer.find({parent: req.params.id})
      .then(result=>{
        if(thread.creator==="anonymous"){

          res.render('user/singlethread', {
            data: thread,
            author: "anonymous",
            answer: result,
            title: thread.question

          })
        }else{
          User.findById({_id: thread.creator})
          .then(creator=>{

            res.render('user/singlethread', {
              data: thread,
              author: creator.name,
              answer: result,
              title: thread.question

            })

          })
        }
      })
    })
  })

module.exports = router
