const mongoose = require('mongoose')

const CCuserSchema = new mongoose.Schema({
    username: {type: String, require: true,unique: true},
    rollno: {type: String, require: true,unique: true},
})

module.exports = mongoose.model("CCusername", CCuserSchema)