// Importações necessárias para os testes
const request = require('supertest'); // Importar o supertest para fazer requisições HTTP
const { expect } = require('chai') // Importar o chai para escrever testes
require('dotenv').config() // Carregar variáveis de ambiente do arquivo .env

// Importar helper de autenticação
const { obterToken } = require('../helpers/autenticacao.js')

// Importar dados de teste do arquivo JSON
const postTransferencias = require('../fixtures/postTransferencias.json')

// Suite de testes para funcionalidade de Transferências
describe('Transferencias', () => {
    let token // Variável para armazenar o token de autenticação

    // Hook que executa antes de cada teste para obter um token válido
    beforeEach(async() => {
        // Capturar o token de autenticação usando credenciais de teste
        token = await obterToken('julio.lima', '123456')
    })

    // Grupo de testes para o endpoint POST /transferencias
    describe('POST /transferencias', () => {
        
        // Teste para transferência com valor válido (>= R$ 10,00)
        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de 10 reais', async() => {
            // Criar uma cópia dos dados de transferência para não modificar o original
            const bodyTransferencias = { ...postTransferencias }
            
            // Fazer requisição POST para o endpoint /transferencias
            const resposta = await request(process.env.BASE_URL) // Definir base url
                .post('/transferencias') // Definir endpoint transferencias
                .set('Content-Type', 'application/json') // Definir header Content-Type
                .set('Authorization', `Bearer ${token}`) // Adicionar token de autenticação
                .send(bodyTransferencias) // Enviar dados no corpo da requisição

            // Assertions para validar a resposta
            expect(resposta.status).to.equal(201); // Verificar se o status é 201 (Created)

        })

        // Teste para transferência com valor inválido (< R$ 10,00)
        it('Deve retornar falha com 422 quando o valor da transferencia for abaixo de 10 reais', async() => {
            // Criar dados de transferência com valor abaixo do mínimo permitido
            const bodyTransferencias = { ...postTransferencias, valor: 7 }
            
            // Fazer requisição POST para o endpoint /transferencias
            const resposta = await request(process.env.BASE_URL) // Definir base url
                .post('/transferencias') // Definir endpoint transferencias
                .set('Content-Type', 'application/json') // Definir header Content-Type
                .set('Authorization', `Bearer ${token}`) // Adicionar token de autenticação
                .send(bodyTransferencias) // Enviar dados no corpo da requisição

            // Verificar se retorna status 422 (Unprocessable Entity)
            expect(resposta.status).to.equal(422);
        })

    })

    // Grupo de testes para o endpoint GET /transferencias/{id}
    describe('GET /transferencias/{id}', () => {
        // Teste para buscar uma transferência específica por ID
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferencia contido no banco de dados quando o id for válido', async() => {
            // Fazer requisição GET para buscar a transferência com ID 5
            const resposta = await request(process.env.BASE_URL) // Definir base url
                .get('/transferencias/12') // Definir endpoint transferencias com ID 12
                .set('Authorization', `Bearer ${token}`) // Adicionar token de autenticação

            // Assertions para validar a resposta
            expect(resposta.status).to.equal(200) // Verificar se o status é 200 (OK)
            expect(resposta.body.id).to.equal(12) // Verificar se o ID retornado é 12
            expect(resposta.body.id).to.be.a('number') // Verificar se o ID é do tipo number
            expect(resposta.body.conta_origem_id).to.equal(1) // Verificar conta de origem
            expect(resposta.body.conta_destino_id).to.equal(2) // Verificar conta de destino
            expect(resposta.body.valor).to.equal(11.00) // Verificar o valor da transferência
 
        })
    })

    // Grupo de testes para o endpoint GET /transferencias (listagem com paginação)
    describe('GET /transferencias', () => {
        // Teste para verificar a paginação da listagem de transferências
        it('Deve retornar 10 elementos na paginação quando informar limite de 10 registros', async() => {
            // Fazer requisição GET com parâmetros de paginação
            const resposta = await request(process.env.BASE_URL) // Definir base url
                .get('/transferencias?page=1&limit=10') // Definir página 1 com limite de 10 registros
                .set('Authorization', `Bearer ${token}`) // Adicionar token de autenticação

            // Logs para debug (podem ser removidos em produção)
            console.log(resposta.body) // Log do corpo da resposta
            
            // Assertions para validar a resposta
            expect(resposta.status).to.equal(200) // Verificar se o status é 200 (OK)
            expect(resposta.body.limit).to.equal(10) // Verificar se o limite retornado é 10
            expect(resposta.body.transferencias).to.have.lengthOf(10) // Verificar se há exatamente 10 transferências na lista
        })
    })

    // Grupo de testes para o endpoint PATCH /transferencias/{id}
    describe('PATCH /transferencias/{id}', () => {
        // Teste para alteração parcial de uma transferência
        it('Deve retornar sucesso com 204 quando alterar parcialmente uma transferencia com dados válidos', async() => {
            // Dados para alteração parcial da transferência
            const dadosAlteracao = {
                valor: 30.00
            }
            
            // Fazer requisição PATCH para alterar a transferência com ID 20
            const resposta = await request(process.env.BASE_URL) // Definir base url
                .patch('/transferencias/20') // Definir endpoint transferencias com ID 20
                .set('Content-Type', 'application/json') // Definir header Content-Type
                .set('Authorization', `Bearer ${token}`) // Adicionar token de autenticação
                .send(dadosAlteracao) // Enviar dados de alteração no corpo da requisição

            // Assertions para validar a resposta
            expect(resposta.status).to.equal(204) // Verificar se o status é 204 (OK)
            expect(resposta.body.valor).to.equal(30.00) // Verificar se o valor foi alterado corretamente
            expect(resposta.body.conta_origem_id).to.equal(1) // Verificar se a conta de origem permanece inalterada
            expect(resposta.body.conta_destino_id).to.equal(2) // Verificar se a conta de destino permanece inalterada
        })

        // Teste para alteração parcial com valor inválido
        it('Deve retornar falha com 422 quando tentar alterar o valor para abaixo de 10 reais', async() => {
            // Dados para alteração parcial com valor inválido
            const dadosAlteracao = {
                valor: 5.00
            }
            
            // Fazer requisição PATCH para alterar a transferência com ID 20
            const resposta = await request(process.env.BASE_URL) // Definir base url
                .patch('/transferencias/20') // Definir endpoint transferencias com ID 20
                .set('Content-Type', 'application/json') // Definir header Content-Type
                .set('Authorization', `Bearer ${token}`) // Adicionar token de autenticação
                .send(dadosAlteracao) // Enviar dados de alteração no corpo da requisição

            // Verificar se retorna status 422 (Unprocessable Entity)
            expect(resposta.status).to.equal(422)
        })
    })

    // Grupo de testes para o endpoint PATCH /transferencias (alteração total)
    describe('PATCH /transferencias (alteração total)', () => {
        // Teste para alteração total de uma transferência
        it('Deve retornar sucesso com 204 quando alterar totalmente uma transferencia com dados válidos', async() => {
            // Dados para alteração total da transferência
            const dadosAlteracao = {
                conta_origem_id: 2,
                conta_destino_id: 1,
                valor: 133.00
            }
            
            // Fazer requisição PATCH para alterar a transferência com ID 19
            const resposta = await request(process.env.BASE_URL) // Definir base url
                .patch('/transferencias/19') // Definir endpoint transferencias com ID 19
                .set('Content-Type', 'application/json') // Definir header Content-Type
                .set('Authorization', `Bearer ${token}`) // Adicionar token de autenticação
                .send(dadosAlteracao) // Enviar dados de alteração no corpo da requisição

            // Assertions para validar a resposta
            expect(resposta.status).to.equal(204) // Verificar se o status é 204 (OK)
            expect(resposta.body.valor).to.equal(133.00) // Verificar se o valor foi alterado corretamente
            expect(resposta.body.conta_origem_id).to.equal(2) // Verificar se a conta de origem foi alterada corretamente
            expect(resposta.body.conta_destino_id).to.equal(1) // Verificar se a conta de destino foi alterada corretamente
        })    
    })
})