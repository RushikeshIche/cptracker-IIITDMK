const LCuserSchema = require("../models/leetCodeUser")
const express = require("express")

const router = express.Router();

const AddData = async (usernames) => {
    try {
        for (const user of usernames) {
            // Check if the user already exists in the database
            const exists = await LCuserSchema.findOne({ username: user.username });
            if (!exists) {
                // Insert the user if they don't already exist
                await LCuserSchema.create(user);
            } else {
                // console.log(`Duplicate user skipped: ${user.username}`);
            }
        }
        console.log("All leetcode username successfully processed");
    } catch (error) {
        console.log("Unable to add leetcode username:", error.message);
    }
};

router.post("/add", async (req,res) => {
    const {username, rollno} = req.body
    try {
        const usernames = [
            {
                username,
                rollno
            },
        ]
        await AddData(usernames)
        res.status(200).json({
            message: "Leetcode username successfully added"
        })
    } catch (error) {
        console.log("unable to add leetcode user",error)
    }
    
})

module.exports = router