const puppeteer = require('puppeteer');

describe('CRUD', () => {
    beforeAll(async () => {
        await page.goto(`file://${__dirname}/index.html`);
    });
    it ('quando clicar no botão cadastrar, deve abrir o modal de cadastro', async () => {
        const nomeFunc = "_modal_abrir"
        
        await page.click('#cadastrarCliente')
        const classeModal = await page.evaluate(() => document.getElementById('modal').className);
        const screenshot = await page.screenshot({path: `./capturas_de_tela/captura${nomeFunc}.png`});
        await expect(classeModal).toMatch('modal active');
    });
    it('com o modal cadastro aberto, ao clicar no botão cancelar, o modal deve ser fechado', async () =>{
        const modalAberto = "_modal_aberto"
        const fecharModal = "_modal_fechado"
        
        await page.click('#cadastrarCliente');
        const screenshot1 = await page.screenshot({path: `./capturas_de_tela/closeModal/captura${modalAberto}.png`});
        await page.click('#cancelar');
        const screenshot2 = await page.screenshot({path: `./capturas_de_tela/closeModal/captura${fecharModal}.png`});
        const classeModal = await page.evaluate(() => document.getElementById('modal').className);

        await expect(classeModal).toMatch('modal');
    });
    it('', async () =>{
        await page.click('#cadastrarCliente');
        await page.click('#salvar');
        await page.waitForTimeout(1000);
        const screenshot1 = await page.screenshot({path: `./capturas_de_tela/captura${"_salvar"}.png`});
    });
});