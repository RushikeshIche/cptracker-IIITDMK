const express = require("express");
const port = 3005;
const cors = require('cors')
const app = express();
const mongoose = require("mongoose")
require('dotenv').config();

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
const user = require('./routes/username.js')
const leetcode = require('./routes/leetcode.js')

app.use('/codechef', codeChefScraping);
app.use('/codeforces',codeforces);
app.use('/user', user);
app.use('/leetcode', leetcode);

app.listen(port, () => {
    connectMongo();
    console.log(`Server running on http://localhost:${port}`);
});