const mongoose = require("mongoose")

const CodechefSchema = new mongoose.Schema({
    Rank: {type: String, required: true},
    Username: {type: String, required: true},
    Star: {type: String, required: true},
    Institute: {type: String, required: true},
    Score: {type: String, required: true},
    LastAc: {type: String, required: true},
    p1: {type: String, required: true},
    p2: {type: String, required: true},
    p3: {type: String, required: true},
    p4: {type: String, required: true}
})

module.exports = mongoose.model("CodechefData", CodechefSchema)