const { default: axios } = require('axios');
const express = require('express')
const CodeforcesData = require("../models/codeforcesdata");

const router = express.Router();
const usernames = [
    "Rohan1857","byteninja_05","Rohan1857","byteninja_05","tourist","rineetpandey","Rohan1875","123cs0003","123cs0009","Aniket_Gupta_","hydro_7"
]

const AddData = async (userdata) => {
    try {
        await CodeforcesData.insertMany(userdata)
        console.log("Data successfully uploaded")
    } catch (error) {
        console.log("unable to save the data: ", error.message)
    }
}

const getData = async (username) => {
    try {
        const res = await axios.get(`https://codeforces.com/api/user.rating?handle=${username}`)
        return res.data.result
    } catch (error) {
        console.error(`Error fetching data for ${username}:`, error.message);
        return null;
    }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const fecthAllData = async (packetSize=5, delayMs=2000) => {
    const allData = [];
    for (let i=0;i<usernames.length;i+=packetSize){
        const packet = usernames.slice(i,i+packetSize)

        const userPromises = packet.map((currUser) => {
            return getData(currUser)
        });
        const userResponses = await Promise.all(userPromises);
        const filterdData = userResponses
        .filter((currUser) => currUser && currUser.length > 0)
        .map((currUser) => currUser[currUser.length - 1]);
        allData.push(...filterdData)

        if (i+packetSize < usernames.length){
            console.log("waiting for second bacth to fetch")
            await delay(delayMs)
        }
    }

    return allData;
}

router.post('/add', async (req,res) => {
    try {
        const data = await fecthAllData();
        await CodeforcesData.deleteMany({});
        AddData(data)
        res.json({message: "data succefully added to data"})
    } catch (error) {
        console.error("Error fetching Codeforces data:", error.message);
        res.status(500).json({ error: "Failed to fetch Codeforces data" });
    }
})
router.get('/show', async (req,res) => {
    try {
        const data = await CodeforcesData.find({});
        res.status(200).json({
            data
        })
    } catch (error) {
        console.error("Error while fetching data")
        res.status(500).json({error: "Failed to fetch data"})
    }
})
module.exports = router