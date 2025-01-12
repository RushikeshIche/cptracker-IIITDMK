const CFuserdata = require("../models/codeForcesUser")
const express = require("express")

const router = express.Router();

const AddData = async (usernames) => {
    try {
        await CFuserdata.insertMany(usernames)
        console.log("Data successfully uploaded")
    } catch (error) {
        console.log("unable to add data",error)
    }
}

router.post("/add", async (req,res) => {
    try {
        const usernames = [
            {username: "Rohan1857"},
            {username: "byteninja_05"},
            {username: "tourist"},
            {username: "rineetpandey"},
            {username: "Rohan1875"},
            {username: "123cs0003"},
            {username: "123cs0009"},
            {username: "Aniket_Gupta_"},
            {username: "hydro_7"}
        ]
        await AddData(usernames)
        res.status(200).json({
            message: "username successfully added"
        })
    } catch (error) {
        console.log("unable to add data",error)
    }
    
})

module.exports = router