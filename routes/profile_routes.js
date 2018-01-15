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
			openness: Math.round(big5Data[0].percentile * 100) / 100,
			conscientiousness: Math.round(big5Data[1].percentile * 100) / 100,
			extraversion: Math.round(big5Data[2].percentile * 100) / 100,
			agreeableness: Math.round(big5Data[3].percentile * 100) / 100,
			emotionalRange: Math.round(big5Data[4].percentile * 100) / 100,
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

router.put("/:id", (req, res) => {
	// correct ObjectId
	// console.log(req.params.id)

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
		// getting response from watson below
		// console.log(big5Data)

		var personality = {
			openness: Math.round(big5Data[0].percentile * 100) / 100,
			conscientiousness: Math.round(big5Data[1].percentile * 100) / 100,
			extraversion: Math.round(big5Data[2].percentile * 100) / 100,
			agreeableness: Math.round(big5Data[3].percentile * 100) / 100,
			emotionalRange: Math.round(big5Data[4].percentile *100) / 100,
			created_at: new Date ()
		}

		Big5.findByIdAndUpdate(req.params.id, personality)


			// big5Data.save()
			.then(
				() => res.redirect("/profile"),
				(err) => console.log(err)
			)
			// res.send(response)

	})

})
// Big5.findByIdAndUpdate(req.params.id, {
// 	name: formData.name,
// 	cuisine: formData.cuisine
// })
// 	.then((result) => {
//
//
//
//
// 		res.redirect("/profile")
// 	})
// 	.catch(err => console.log(err))
// after update is done, redirect back to resto id
// this redirection can go to anywhere as long as you have the routes with you

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
