import { expect } from 'chai';
import { chromium } from 'playwright';

describe('Login Page Test', function() {
    let browser;
    let page;

    // Increase timeout for Mocha to 10 seconds
    this.timeout(10000);

    // Before hook to launch the browser
    before(async () => {
        browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        page = await context.newPage();
    });

    // After hook to close the browser if it was initialized
    after(async function() {
        if (browser) {
            await browser.close();
        }
    });

    it('should log in successfully with valid credentials', async function() {
        // Step 1: Visit the login page
        await page.goto('https://practicetestautomation.com/practice-test-login/');

        // Step 2: Fill in username and password fields
        await page.fill('#username', 'student'); // Fill the username
        await page.fill('#password', 'Password123'); // Fill the password

        // Step 3: Click the submit button
        await page.click('#submit');

        // Step 4: Verify that "Logged In Successfully" message is displayed
        await page.waitForSelector('.post-title'); // Wait for the element to appear
        const successMessage = await page.textContent('.post-title');
        expect(successMessage).to.include('Logged In Successfully');
    });
});
