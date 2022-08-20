const puppeteer = require('puppeteer');

describe('CRUD', () => {
    beforeAll(async () => {
        await page.goto(`file://${__dirname}/index.html`);
    });
    it ('quando chamar a função "openModal", deve adicianar a classe "modal" o complemento "active".', async () => {

        const openModal = await page.evaluate(() => openModal.call());
        const classeModal = await page.evaluate(() => document.getElementById('modal').className);
        await expect(classeModal).toMatch('modal active');
    });


    it ('quando chamar a função "closeModal", deve retirar a parte "active" da classe css "modal active".', async () => {

        const openModal = await page.evaluate(() => openModal.call());
        const closeModal = await page.evaluate(() => closeModal.call());
        const classeModal = await page.evaluate(() => document.getElementById('modal').className);
        await expect(classeModal).toMatch('modal');
    });

    it('quando a função "deleteClient" for chamada, deve excluir o elemento cliente do array.', async () =>{
        const nome = await page.evaluate(() => document.getElementById('nome').value = "José da silva");
        const email = await page.evaluate(() => document.getElementById('email').value = "josedasilva@email.com");
        const celular = await page.evaluate(() => document.getElementById('celular').value = "00 0000-0000");
        const cidade = await page.evaluate(() => document.getElementById('cidade').value = "Lugar Nenhum-MG");

        const saveClient = await page.evaluate(() => saveClient.call());
        const deleteClient = await page.evaluate(() => deleteClient(0));
        const array = await page.evaluate(() => readClient().length);
        await expect(array).toBe(0);
    }); 

    it('ao chamar a função "saveClient" ele deve salvar o cliente.', async () =>{
        const nome = await page.evaluate(() => document.getElementById('nome').value = "José da silva");
        const email = await page.evaluate(() => document.getElementById('email').value = "josedasilva@email.com");
        const celular = await page.evaluate(() => document.getElementById('celular').value = "00 0000-0000");
        const cidade = await page.evaluate(() => document.getElementById('cidade').value = "Lugar Nenhum-MG");

        const saveClient = await page.evaluate(() => saveClient());
        
        await page.waitForTimeout(1000);

        const readClient = await page.evaluate(() => readClient().length);

        await expect(readClient).toBe(1);
    });

    it('ao chamar a função "readClient" ela deve retornar uma array contendo tamanho maior que 0, neste caso de teste ', async () => {
        const nome = await page.evaluate(() => document.getElementById('nome').value = "José da silva");
        const email = await page.evaluate(() => document.getElementById('email').value = "josedasilva@email.com");
        const celular = await page.evaluate(() => document.getElementById('celular').value = "00 0000-0000");
        const cidade = await page.evaluate(() => document.getElementById('cidade').value = "Lugar Nenhum-MG");

        const saveClient = await page.evaluate(() => saveClient());

        await page.waitForTimeout(1000);

        const readClient = await page.evaluate(() => readClient().length);

        expect(readClient).toBeGreaterThan(0);
    });

    it('função "updateClient"', async () => {
        const nome = await page.evaluate(() => document.getElementById('nome').value = "José da silva");
        const email = await page.evaluate(() => document.getElementById('email').value = "josedasilva@email.com");
        const celular = await page.evaluate(() => document.getElementById('celular').value = "00 0000-0000");
        const cidade = await page.evaluate(() => document.getElementById('cidade').value = "Lugar Nenhum-MG");
        
        const saveClient = await page.evaluate(() => saveClient());

        await page.waitForTimeout(1000);

        const clientModificado = await page.evaluate(() => document.getElementById('tableClient'));

        const updateClient = await page.evaluate(() => updateClient(0, clientModificado));

        expect(clientModificado.nome).toMatch("Maria da Silva");
    })

});
