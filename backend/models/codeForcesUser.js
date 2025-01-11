const mongoose = require('mongoose')

const CFuserSchema = new mongoose.Schema({
    username: {type: String, require: true,unique: true}
})

module.exports = mongoose.model("CFusername", CFuserSchema)