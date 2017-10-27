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

	res.render("users/profile",{
		user: req.user
	})
	// res.send(req.user)
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
			owner: req.body.user
		})
		newPersonality.save()
			.then(
				() => console.log("Saved Successful"),
				(err) => console.log(err)
			)
		// res.send(response)
		res.render("users/profile", { result: response})
	})

})

module.exports = router
