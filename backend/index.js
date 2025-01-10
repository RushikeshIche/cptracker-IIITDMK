const express = require("express");
const port = 3005;
const cors = require('cors')
const app = express();

app.use(cors());
// https://codeforces.com/api/user.rating?handle=Rohan1857

// https://lccn.lbao.site/api/v1/contest-records/user?contest_name=weekly-contest-431&username=AspiringKarmokar&archived=false
const codeChefScraping = require('./routes/codechef.js')
const codeforces = require('./routes/codeforces.js')

app.use('/', codeChefScraping)
app.use('/',codeforces)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
