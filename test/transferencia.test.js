const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao.js')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe ('Transferencias', () => {
    describe('POST /transferencias', () => {
        let token

        beforeEach( async() => {
            // Capturar o token
            token = await obterToken('julio.lima', '123456')
        })

        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de 10 reais', async() => {
            const bodyTransferencias = { ...postTransferencias }
            
            // Realizar Transferencia
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authotization', `Bearer ${token}`)
                .send(bodyTransferencias)

            expect(resposta.status).to.equal(201);

        })

        it('Deve retornar falha com 422 quando o valor da transferencia for abaixo de 10 reais', async() => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 7

            // Realizar Transferencia
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authotization', `Bearer ${token}`)
                .send(bodyTransferencias)

            expect(resposta.status).to.equal(422);

        })

    })

})