const mongoose = require('mongoose')

const LCuserSchema = new mongoose.Schema({
    username: {type: String, require: true,unique: true},
    rollno: {type: String, require: true, unique: true}
})

module.exports = mongoose.model("lcusername", LCuserSchema)