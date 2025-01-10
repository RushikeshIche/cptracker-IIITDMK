const { default: axios } = require('axios');
const express = require('express')
// const pLimit = require("p-limit")

const router = express.Router();
const usernames = [
    "Rohan1857","byteninja_05","jiangly","arvindf232","maspy"
]

const getData = async (username) => {
    // const limit = pLimit()
    try {
        const res = await axios.get(`https://codeforces.com/api/user.rating?handle=${username}`)
        return res.data.result
    } catch (error) {
        console.error(`Error fetching data for ${username}:`, error.message);
        return null;
    }
}

const fecthAllData = async () => {
    const userPromises = usernames.map((currUser) => {
        return getData(currUser)
    });
    const userResponses = await Promise.all(userPromises);

    const AllData = userResponses
    .filter((currUser) => currUser && currUser.length > 0)
    .map((currUser) => currUser[currUser.length - 1]);
    console.log(AllData.length)
    return AllData
}

router.get('/codeforces', async (req,res) => {
    try {
        const data = await fecthAllData();
        res.json(data)
    } catch (error) {
        console.error("Error fetching Codeforces data:", error.message);
        res.status(500).json({ error: "Failed to fetch Codeforces data" });
    }
})
module.exports = router