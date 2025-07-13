// Importações necessárias para os testes
const request = require('supertest'); // Importar o supertest para fazer requisições HTTP
const { expect } = require('chai') // Importar o chai para escrever testes
require('dotenv').config() // Carregar variáveis de ambiente do arquivo .env

// Importar helper de autenticação
const { obterToken } = require('../helpers/autenticacao.js')

// Suite de testes para funcionalidade de Contas
describe('Contas', () => {
    let token // Variável para armazenar o token de autenticação

    // Hook que executa antes de cada teste para obter um token válido
    beforeEach(async() => {
        // Capturar o token de autenticação usando credenciais de teste
        token = await obterToken('julio.lima', '123456')
    })

    // Grupo de testes para o endpoint GET /contas
    describe('GET /contas', () => {
        // Teste para obter todas as contas
        it('Deve retornar sucesso com 200 quando obter todas as contas', async() => {

            // Fazer requisição GET para obter todas as contas
            const resposta = await request(process.env.BASE_URL) // Definir base url
                .get('/contas') // Definir endpoint contas
                .set('Content-Type', 'application/json') // Definir header Content-Type
                .set('Authorization', `Bearer ${token}`) // Adicionar token de autenticação

            // Logs para debug (podem ser removidos em produção)
            console.log(resposta.body) // Log do corpo da resposta

            // Assertions para validar a resposta
            expect(resposta.status).to.equal(200) // Verificar se o status é 200 (OK)
        })
    })
})