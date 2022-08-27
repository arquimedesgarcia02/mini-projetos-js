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
    it('Ao clicar no botão cadastrar deve abrir, e digitar os inputs, depois que clicar em salvar, deve cadastrar o usuario.', async () =>{
        await page.click('#cadastrarCliente');
        
        await page.focus('#nome');
        await page.keyboard.type('Jeca Tatu');

        await page.focus('#email');
        await page.keyboard.type('jeca@tatu.edu.br');

        await page.focus('#cidade');
        await page.keyboard.type('Jecalandia-MG')

        await page.focus('#celular');
        await page.keyboard.type('00 0000-0000');
        
        await page.click('#salvar');
        await page.waitForTimeout(1000);

        const screenshot1 = await page.screenshot({path: `./capturas_de_tela/captura${"_salvar"}.png`});
        const array = await page.evaluate(() => readClient().length);
        
        await expect(array).toBe(2);
    });

    it('Se há um usuario salvo, ao clicar no botão editar abre um modal de editar o usuario, pode-se selecionar um campo para edição e em seguida clica no botão salvar para confirmar', async () => {
        await page.click('#edit-0');
        await page.focus('#nome');
        await page.keyboard.type(' da Silva');
        await page.click('#salvar');

        const screenshot = await page.screenshot({path: `./capturas_de_tela/captura${"_update"}.png`});
        await page.evaluate(() => deleteClient(0));
    });

});