import { expect } from 'chai';
import { chromium } from 'playwright';

describe('Login Page Test', function() {
    let browser;
    let page;

    this.timeout(10000);

    before(async () => {
        browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        page = await context.newPage();
    });

    after(async function() {
        if (browser) {
            await browser.close();
        }
    });

    it('Should log in successfully with valid credentials', async function() {
        await page.goto('https://practicetestautomation.com/practice-test-login/');

        await page.fill('#username', 'student');
        await page.fill('#password', 'Password123');

        await page.click('#submit');

        await page.waitForSelector('.post-title');
        const successMessage = await page.textContent('.post-title');
        expect(successMessage).to.include('Logged In Successfully');
    });

    it('Fail test', async function() {
        await page.goto('https://practicetestautomation.com/practice-test-login/');

        await page.fill('#username', 'studentt');
        await page.fill('#password', 'Password123');

        await page.click('#submit');

        await page.waitForSelector('.post-title');
        const successMessage = await page.textContent('.post-title');
        expect(successMessage).to.include('Logged In Successfully');
    });
});
