require("dotenv").config({
	silent: true
})

const User = require("../models/user")
const express = require("express")
const router = express.Router()
const Big5 = require("../models/big5")
var PersonalityInsightsV3 = require("watson-developer-cloud/personality-insights/v3")

var personality_insights = new PersonalityInsightsV3({
	username: process.env.username,
	password: process.env.password,
	version_date: "2016-10-19"
})

router.get("/", (req, res) => {
	// finding owner by user Id
	Big5.findOne({owner: req.user.id}).sort({created_at: -1})
		.then(
			result => {
				res.render("users/profile",{
					result
				})
			}
		)
	// res.send(data)
	// })
})

router.post("/", (req, res) => {
	// User.findOne()
	// 	.populate("owner")
	// console.log(req.body.user)
	// .then(
	// 	one => {
	// 		var ownerRef = one.id
	// 	})
	// console.log(req.body.textBox)
	personality_insights.profile({
		text: req.body.textBox,
		consumption_preferences: true
	},
	function (err, response) {
		if (err)
			console.log("error:", err)
		// else
		// console.log(JSON.stringify(response, null, 2))
		var big5Data = response["personality"]
		var newPersonality = new Big5({
			openness: big5Data[0].percentile,
			conscientiousness: big5Data[1].percentile,
			extraversion: big5Data[2].percentile,
			agreeableness: big5Data[3].percentile,
			emotionalRange: big5Data[4].percentile,
			created_at: new Date (),
			owner: req.body.user
		})
		newPersonality.save()
			.then(
				() => res.redirect("/profile"),
				(err) => console.log(err)
			)
		// res.send(response)

	})

})

router.delete("/:id", (req, res) => {
// Find by user id and delete 
	Big5.findByIdAndRemove(req.params.id)
		.then((result) => {
			console.log(result)
			res.redirect("/profile")
			// res.redirect('./users/profile')
		})
		.catch(err => console.log(err))
})

module.exports = router
