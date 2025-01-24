const mongoose = require("mongoose")

const CodeforcesSchema = new mongoose.Schema({
    contestId: {type: String, required: true},
    contestName: {type: String, required: true},
    handle: {type: String, required: true},
    newRating: {type: String, required: true},
    oldRating: {type: String, required: true},
    rank: {type: String, required: true},
    rollno: {type: String, required: true},
    check: {type: Boolean},
})

module.exports = mongoose.model("CodeforcesData", CodeforcesSchema)