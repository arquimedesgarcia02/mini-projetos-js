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

        await page.evaluate(() => deleteClient(0));
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

        await page.evaluate(() => deleteClient(0));
    });

    it('A função "updateClient" deve modificar um campo ou mais do cliente, e salva-lo na mesmo index', async () => {
        const nome = await page.evaluate(() => document.getElementById('nome').value = "José da silva");
        const email = await page.evaluate(() => document.getElementById('email').value = "josedasilva@email.com");
        const celular = await page.evaluate(() => document.getElementById('celular').value = "00 0000-0000");
        const cidade = await page.evaluate(() => document.getElementById('cidade').value = "Lugar Nenhum-MG");
        
        const saveClient = await page.evaluate(() => saveClient());

        await page.waitForTimeout(1000);

        const updateClient = await page.evaluate(() => updateClient(0, { nome:'Elenão', cidade: 'Lulalandia', email: 'elenão@feminista.com' ,celular: '44 4444-4444' }));

        await page.waitForTimeout(1000);

        const readClient = await page.evaluate(() => readClient()[0]); 

        expect(readClient.nome).toMatch("Elenão");

        await page.evaluate(() => deleteClient(0));
    });

    it('a função "createClient" deve adicionar o cliente no banco de dados ', async () =>{
        const createClient = await page.evaluate(() => createClient({ nome:'Elenão', cidade: 'Lulalandia', email: 'elenão@feminista.com' ,celular: '44 4444-4444' }))

        const readClient = await page.evaluate(() => readClient());
        
        expect(readClient.length).toBeGreaterThan(0);

        await page.evaluate(() => deleteClient(0));
    });

    it('a função "isValidFields" deve verificar se inputs de cliente estão corretos, antes de adicionar no banco de dados, neste caso um input está incorreto, portanto o cliente não sera salvo', async () =>{
        const nome = await page.evaluate(() => document.getElementById('nome').value = "José da silva");
        const email = await page.evaluate(() => document.getElementById('email').value = "josédasilva@email.com");
        const celular = await page.evaluate(() => document.getElementById('celular').value = "00 0000-0000");
        const cidade = await page.evaluate(() => document.getElementById('cidade').value = "Lugar Nenhum-MG");
        
        const saveClient = await page.evaluate(() => saveClient());

        await page.waitForTimeout(1000);

        const readClient = await page.evaluate(() => readClient().length);

        await expect(readClient).toBe(0);
    });

    it('A função "clearFields" deve limpar os campos do modal, apoś a criação de um cliente no crud, para a inserção de novos dados de um novo cliente no modal.', async () =>{
        const nome = await page.evaluate(() => document.getElementById('nome').value = "José da silva");
        const email = await page.evaluate(() => document.getElementById('email').value = "josedasilva@email.com");
        const celular = await page.evaluate(() => document.getElementById('celular').value = "00 0000-0000");
        const cidade = await page.evaluate(() => document.getElementById('cidade').value = "Lugar Nenhum-MG");
        
        const saveClient = await page.evaluate(() => saveClient());

        const clearFields = await page.evaluate(() => clearFields());
        const openModal = await page.evaluate(() => openModal.call());
        const modalField = await page.evaluate(() => document.getElementById('nome').value)
        
        expect(modalField).toMatch("");
        await page.evaluate(() => deleteClient(0));
    });

    it('A função "createRow" deve retornar colunas em uma tabela no html, e neste caso caso de teste usamos a existencia do botão excluir como parametro de teste.', async () =>{
        const nome = await page.evaluate(() => document.getElementById('nome').value = "José da silva");
        const email = await page.evaluate(() => document.getElementById('email').value = "josedasilva@email.com");
        const celular = await page.evaluate(() => document.getElementById('celular').value = "00 0000-0000");
        const cidade = await page.evaluate(() => document.getElementById('cidade').value = "Lugar Nenhum-MG");
        
        const saveClient = await page.evaluate(() => saveClient());

        const row = await page.evaluate(() => document.getElementById('delete-0').textContent);

        await expect(row).toMatch("Excluir");
    });

});
