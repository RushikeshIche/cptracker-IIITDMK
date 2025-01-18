const mongoose = require('mongoose')

const ContestSchema = new mongoose.Schema({
    codeforces: {type: String, require: true,unique: true},
    leetcode: {type: String, require: true, unique: true}
})

module.exports = mongoose.model("contest", ContestSchema)