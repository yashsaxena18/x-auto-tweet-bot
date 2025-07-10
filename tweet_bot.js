const { chromium } = require('playwright');

const email = process.env.TWITTER_EMAIL;
const password = process.env.TWITTER_PASS;
const tweetMessage = `🔥 Auto Tweet: It's a great day for cricket! 🏏 #Cricket #Trending`;

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        await page.goto('https://twitter.com/login', { waitUntil: 'networkidle' });

        await page.fill('input[name="text"]', email);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2000);

        await page.fill('input[name="password"]', password);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(5000);

        // Click the tweet box and type message
        await page.click('div[aria-label="Tweet text"]');
        await page.keyboard.type(tweetMessage);

        // Click the Tweet button
        await page.click('div[data-testid="tweetButtonInline"]');
        console.log("✅ Tweet posted successfully.");
    } catch (error) {
        console.error("❌ Error tweeting:", error);
    } finally {
        await browser.close();
    }
})();