const express = require("express");
const port = 3005;
const cors = require('cors')
const app = express();
const mongoose = require("mongoose")
require('dotenv').config();

app.use(express.json())
app.use(cors());
const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb Connected Successfully")
    } catch (error) {
        console.log(error);
    }
}
const codeChefScraping = require('./routes/codechef.js')
const codeforces = require('./routes/codeforces.js')
const cfuser = require('./routes/cfuser.js')
const lcuser = require('./routes/lcuser.js')
const ccuser = require('./routes/ccuser.js')
const leetcode = require('./routes/leetcode.js')
const currentcontest = require("./routes/contestName.js")
const cf = require('./routes/cf.js')

app.use('/codechef', codeChefScraping);
app.use('/codeforces',codeforces);
app.use('/cfuser', cfuser);
app.use('/lcuser',lcuser)
app.use('/ccuser',ccuser)
app.use('/leetcode', leetcode);
app.use('/currentcontest', currentcontest);
app.use('/cf', cf);

app.listen(port, () => {
    connectMongo();
    console.log(`Server running on http://localhost:${port}`);
});