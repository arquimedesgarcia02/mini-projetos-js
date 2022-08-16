const puppeteer = require('puppeteer');

describe('CRUD', () => {
    beforeAll(async () => {
        await page.goto(`file://${__dirname}/index.html`);
    });
    it ('quando chamar a função "openModal", deve adicianar a classe modal active.', async () => {

        const openModal = await page.evaluate(() => openModal.call());
        const classeModal = await page.evaluate(() => document.getElementById('modal').className);
        await expect(classeModal).toMatch('modal active');
    });


    it ('quando chamar a função "closeModal", deve retirar a classe modal active.', async () => {

        const openModal = await page.evaluate(() => openModal.call());
        const closeModal = await page.evaluate(() => closeModal.call());
        const classeModal = await page.evaluate(() => document.getElementById('modal').className);
        await expect(classeModal).toMatch('modal');
    });
});
