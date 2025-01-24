const express = require('express');
const { chromium } = require('playwright'); // Import Playwright
const router = express.Router();
const codechefdata = require("../models/codechefdata");

const AddData = async (userdata) => {
    try {
        await codechefdata.insertMany(userdata);
        console.log("Data successfully uploaded");
    } catch (error) {
        console.log("Unable to save the data:", error.message);
    }
};

const extractData = (dataArray) => {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        console.error("Invalid dataArray:", dataArray);
        return {};
    }

    const Rank = dataArray[0]?.split('\n\n')[1]?.trim() || "N/A";
    const OtherData = dataArray[1]?.split('\n') || [];
    const Star = OtherData[1]?.trim()?.slice(0, 2) || "N/A";
    const Username = OtherData[1]?.trim()?.slice(2) || "N/A";
    const Institute = OtherData[3]?.trim() || "N/A";
    const Score = dataArray[2]?.split('\n')[1]?.trim() || "N/A";
    const LastAc = dataArray[3]?.split('\n\n')[1]?.trim() || "N/A";
    const p1 = dataArray[4]?.split('\n')[1]?.trim() || "N/A";
    const p2 = dataArray[5]?.split('\n')[1]?.trim() || "N/A";
    const p3 = dataArray[6]?.split('\n')[1]?.trim() || "N/A";
    const p4 = dataArray[7]?.split('\n')[1]?.trim() || "N/A";

    return {
        Rank,
        Username,
        Star,
        Institute,
        Score,
        LastAc,
        p1,
        p2,
        p3,
        p4
    };
};

const MapData = (DataArray) => {
    const ContestRankingData = DataArray.map(currElement => {
        return extractData(currElement);
    });
    return ContestRankingData;
};

const scrapData = async (contestName, category, isAdd) => {
    try {
        const browser = await chromium.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ],
        });
        const page = await browser.newPage();

        const url = `https://www.codechef.com/rankings/${contestName}${category}?filterBy=Institution%3DIndian%20Institute%20of%20Information%20Technology%20Design%20and%20Manufacturing%2C%20Kurnool&itemsPerPage=100&order=asc&page=1&sortBy=rank`;
        await page.goto(url, { waitUntil: 'networkidle' });

        await page.waitForSelector('.MuiPaper-root');

        const data = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('.MuiPaper-root table tbody tr'));
            return rows.map(row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns).map(col => col.innerText.trim());
            });
        });
        await browser.close();

        const contestData = data && data.length > 0 && MapData(data);
        if (isAdd) await AddData(contestData);
        if (!isAdd) return contestData;
    } catch (error) {
        console.error("Error occurred while scraping:", error);
    }
};

router.post("/add", async (req, res) => {
    const { contestName } = req.query;
    await codechefdata.deleteMany({});
    await scrapData(contestName, "A", true);
    await scrapData(contestName, "B", true);
    await scrapData(contestName, "C", true);
    await scrapData(contestName, "D", true);
    res.status(200).json({
        message: "Data successfully saved in the database",
    });
});

router.get("/individual", async (req, res) => {
    const { contestName, category } = req.query;
    const contestData = await scrapData(contestName, category, false);
    res.status(200).json({
        contestData
    });
});

router.get("/show", async (req, res) => {
    try {
        const contestData = await codechefdata.find();
        res.status(200).json({
            contestData: contestData,
        });
    } catch (error) {
        console.error("Error occurred while retrieving data:", error);
        res.status(500).send({ error: "Failed to retrieve the data" });
    }
});

module.exports = router;
