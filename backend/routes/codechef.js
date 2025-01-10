const express = require('express')
const puppeteer = require('puppeteer');
const router = express.Router();

router.get("/scrape", async (req, res) => {
    const {contestName = "START167", category = "C"} = req.query
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        const url = `https://www.codechef.com/rankings/${contestName}${category}?filterBy=Institution%3DIndian%20Institute%20of%20Information%20Technology%20Design%20and%20Manufacturing%2C%20Kurnool&itemsPerPage=100&order=asc&page=1&sortBy=rank`;
        await page.goto(url, { waitUntil: 'networkidle2' });

        await page.waitForSelector('.MuiPaper-root');

        const data = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('.MuiPaper-root table tbody tr'));
            return rows.map(row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns).map(col => col.innerText.trim());
            });
        });

        await browser.close();
        res.status(200).json({
            contestData: data,
        })
    } catch (error) {
        console.error("Error occurred while scraping:", error);
        res.status(500).send({ error: "Failed to scrape the data" });
    }
});

module.exports = router;