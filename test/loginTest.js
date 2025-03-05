import { expect } from 'chai';
import { chromium } from 'playwright';

describe('Login Page Test', function() {
    let browser;
    let page;

    this.timeout(10000);

    before(async function() {
        browser = await chromium.connect({
            wsEndpoint: 'ws://host.docker.internal:4444/playwright/chromium?headless=false&enableVNC=true&screenResolution=1920x1080x24',
        });
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

    // it('Should fail to log in with invalid credentials', async function() {
    //     await page.goto('https://practicetestautomation.com/practice-test-login/');
    //
    //     await page.fill('#username', 'invalid_user');
    //     await page.fill('#password', 'invalid_pass');
    //
    //     await page.click('#submit');
    //
    //     const errorMessage = await page.textContent('.error');
    //     expect(errorMessage).to.include('Your username is invalid!');
    // });
    //test2
});
