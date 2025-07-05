const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()

describe ('Transferencias', () => {
    describe('POST /transferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de 10 reais', async() => {
            // Capturar o token
            const respostaLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
            })
            
            const token = respostaLogin.body.token

            // Realizar Transferencia
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authotization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 11,
                    token: ""
                })

            expect(resposta.status).to.equal(201);

        })

        it('Deve retornar falha com 422 quando o valor da transferencia for abaixo de 10 reais', async() => {
            // Capturar o token
            const respostaLogin = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
            })
            
            const token = respostaLogin.body.token

            // Realizar Transferencia
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authotization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 7,
                    token: ""
                })

            expect(resposta.status).to.equal(422);

        })

    })

})