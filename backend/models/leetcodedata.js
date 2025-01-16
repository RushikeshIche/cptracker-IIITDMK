const mongoose = require("mongoose")

const LeetCodeSchema = new mongoose.Schema({
    contest_id: {type: String},
    contest_name: {type: String},
    username: {type: String, required: true},
    new_rating: {type: String},
    old_rating: {type: String},
    rank: {type: String, required: true},
})

module.exports = mongoose.model("LeetCodeData", LeetCodeSchema)