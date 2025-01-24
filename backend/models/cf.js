const mongoose = require("mongoose")

const CfSchema = new mongoose.Schema({
    code: {type: String, required: true},
    username: {type: String, required: true},
    rating: {type: String, required: true},
    rollno: {type: String, required: true},
    rank: {type: String, required: true},
})

module.exports = mongoose.model("CfData", CfSchema)