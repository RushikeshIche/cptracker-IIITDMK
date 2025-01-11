const express = require("express");
const port = 3005;
const cors = require('cors')
const app = express();
const mongoose = require("mongoose")

app.use(cors());
const connectMongo = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/CodeChef", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDb Connected Successfully")
    } catch (error) {
        console.log(error);
    }
}
const codeChefScraping = require('./routes/codechef.js')
const codeforces = require('./routes/codeforces.js')
const saveData = require('./routes/SaveCodechefdata.js')

app.use('/scrape', codeChefScraping)
app.use('/codeforces',codeforces)
app.use('/addcodechef',saveData)

app.listen(port, () => {
    connectMongo();
    console.log(`Server running on http://localhost:${port}`);
});

// https://lccn.lbao.site/api/v1/contest-records/user?contest_name=weekly-contest-431&username=AspiringKarmokar&archived=false