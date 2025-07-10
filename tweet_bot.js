const { chromium } = require('playwright');

const email = process.env.TWITTER_EMAIL;
const password = process.env.TWITTER_PASS;
const tweetMessage = `🔥 Auto Tweet: It's a great day for cricket! 🏏 #Cricket #Trending`;

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        console.log("🔐 Opening Twitter login...");
        await page.goto('https://twitter.com/login', { waitUntil: 'networkidle' });

        await page.fill('input[name="text"]', email);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2000);

        await page.fill('input[name="password"]', password);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(5000); // wait for login to complete

        console.log("🕵️ Waiting for tweet button...");
        await page.waitForSelector('div[role="textbox"]', { timeout: 15000 });

        console.log("✍️ Typing tweet...");
        await page.click('div[role="textbox"]');
        await page.keyboard.type(tweetMessage);

        await page.waitForTimeout(2000); // let typing settle
        console.log("📤 Posting tweet...");
        await page.click('div[data-testid="tweetButtonInline"]');

        console.log("✅ Tweet posted successfully.");
    } catch (error) {
        console.error("❌ Error tweeting:", error);
    } finally {
        await browser.close();
    }
})();
