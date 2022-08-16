const puppeteer = require('puppeteer');

describe('CRUD', () => {
    beforeAll(async () => {
        await page.goto(`file://${__dirname}/index.html`);
    });
    it ('quando chamar a função "openModal", deve adicianar a classe modal active.', async () => {
        await page.click('#cadastrarCliente')
        const openModal = await page.evaluate("openModal");
        const classeModal = await page.evaluate(() => document.getElementById('modal').className);
        await expect(classeModal).toMatch('modal active');
    });
});