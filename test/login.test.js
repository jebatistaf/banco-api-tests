// Importações necessárias para os testes
const request = require('supertest'); // Importar o supertest para fazer requisições HTTP
const { expect } = require('chai') // Importar o chai para escrever testes
require('dotenv').config() // Carregar variáveis de ambiente do arquivo .env

// Importar dados de teste do arquivo JSON
const postLogin = require('../fixtures/postLogin.json')

// Suite de testes para funcionalidade de Login
describe('Login', () => {
    // Grupo de testes para o endpoint POST /login
    describe('POST /login', () => {
        
        // Teste para login com credenciais válidas
        it('Deve retornar 200 com um token em string quando usar credenciais válidas', async() => {
            // Criar uma cópia dos dados de login para não modificar o original
            const bodyLogin = { ... postLogin }
            
            // Fazer requisição POST para o endpoint /login
            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json') // Definir header Content-Type
                .send(bodyLogin) // Enviar dados no corpo da requisição
            
            // Logs para debug (podem ser removidos em produção)
            console.log(resposta.body)
            console.log(resposta.status)    

            // Assertions para validar a resposta
            expect(resposta.body.token).to.be.a('string'); // Verificar se o token é uma string
            expect(resposta.status).to.equal(200); // Verificar se o status é 200 (OK)

        })

        // Teste para login com credenciais inválidas
        it('Deve retornar 401 quando usar credenciais inválidas', async() => {
            // Criar dados de login com senha incorreta
            const bodyLogin = { ...postLogin, senha: 'senha_incorreta' };
            
            // Fazer requisição POST para o endpoint /login
            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin);
            
            // Logs para debug
            console.log(resposta.body);
            console.log(resposta.status);

            // Verificar se retorna status 401 (Unauthorized)
            expect(resposta.status).to.equal(401);
        });

        // Teste para login sem dados obrigatórios
        it('Deve retornar 400 quando não enviar dados obrigatórios', async() => {
            // Enviar objeto vazio (sem dados obrigatórios)
            const bodyLogin = {};
            
            // Fazer requisição POST para o endpoint /login
            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin);
            
            // Logs para debug
            console.log(resposta.body);
            console.log(resposta.status);

            // Verificar se retorna status 400 (Bad Request)
            expect(resposta.status).to.equal(400);
        });

    })

})
