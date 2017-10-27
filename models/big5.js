const mongoose = require("mongoose")
const Schema = mongoose.Schema

const big5Schema = new Schema ({
	openness: Number,
	conscientiousness: Number,
	extraversion: Number,
	agreeableness: Number,
	emotionalRange: Number,
	created_at: Date,
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User"
	}
})

const Big5 = mongoose.model("Big5", big5Schema)

module.exports = Big5
