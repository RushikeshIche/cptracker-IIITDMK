const express = require("express")
const router = express.Router();
const ContestSchema = require("../models/currentContest")

router.post('/add', async (req,res) => {
    const {codeforces, leetcode, codechef} = req.body;
    const contestname = {
        codeforces,
        leetcode,
        codechef
    }
    try {
        await ContestSchema.deleteMany({});
        await ContestSchema.insertMany(contestname);
        res.status(200).json({
            message: "contest name succefully updated"
        })
    } catch (error) {
        res.status(500).json({
            message: "unable to add contest name",
            error
        })
    }
})

router.get('/show', async (req,res) => {
    try {
        const data = await ContestSchema.find();
        res.status(200).json({
            data
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while getting data from database",
            error
        })
    }

})
module.exports = router