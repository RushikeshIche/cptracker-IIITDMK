const { default: axios } = require('axios');
const express = require('express')
const CfSchema = require("../models/cf");
const CCusername = require("../models/codeChefUser")
const ContestSchema = require("../models/currentContest")

const router = express.Router();
const getUsername = async () => {
    const username = await CCusername.find();
    return username;
}

const getContestName = async () => {
    const data = await ContestSchema.find();
    return data[0].codechef
}

const AddData = async (userdata) => {
    try {
        await CfSchema.insertMany(userdata)
        console.log("Data successfully uploaded")
    } catch (error) {
        console.log("unable to save the data: ", error.message)
    }
}

const getData = async ({username,rollno}) => {
    try {
        const res = await axios.get(`https://codechef-api.vercel.app/handle/${username}`)
        if (res.data.ratingData.length > 0){
            res.data.ratingData[res.data.ratingData.length-1].rollno = rollno
            res.data.ratingData[res.data.ratingData.length-1].username = username
        }
        return res.data.ratingData
    } catch (error) {
        console.error(`Error fetching data for ${username}:`, error.message);
        return null;
    }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const fecthAllData = async (packetSize=5, delayMs=2000) => {
    const usernames = await getUsername()
    // const usernames = [{username: "yoke_snow_87", rollno: "123cs0009"},{username: "rohan1875", rollno: "123cd0003"},{username: "hydr0_7", rollno: "123cs0022"},{username: "yvmr33", rollno: "122cs0022"}]
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
    const Current_Contest = await getContestName();
    try {
        const data = await fecthAllData();
        const updatedData = data.map((currData,index) => {
            if (currData.code.slice(0,8)===Current_Contest) currData.check=true
            else{
                currData.check=false
                currData.rank = 999999
            }
            return currData
        })
        await CfSchema.deleteMany({});
        await AddData(updatedData)
        res.json({message: "data succefully added to data"})
    } catch (error) {
        console.error("Error fetching Codeforces data:", error.message);
        res.status(500).json({ error: "Failed to fetch Codeforces data" });
    }
})
router.get('/show', async (req,res) => {
    try {
        const data = await CfSchema.find({});
        res.status(200).json({
            data
        })
    } catch (error) {
        console.error("Error while fetching data")
        res.status(500).json({error: "Failed to fetch data"})
    }
})
module.exports = router
