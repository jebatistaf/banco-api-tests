const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json')

describe('Login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com um token em string quando usar credenciais válidas', async() => {
            const bodyLogin = { ... postLogin }
            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)
            
            console.log(resposta.body)
            console.log(resposta.status)    

            expect(resposta.body.token).to.be.a('string');
            expect(resposta.status).to.equal(200);

        })

        it('Deve retornar 401 quando usar credenciais inválidas', async() => {
            const bodyLogin = { ...postLogin, senha: 'senha_incorreta' };
            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin);
            
            console.log(resposta.body);
            console.log(resposta.status);

            expect(resposta.status).to.equal(401);
        });

        it('Deve retornar 400 quando não enviar dados obrigatórios', async() => {
            const bodyLogin = {};
            const resposta = await request(process.env.BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin);
            
            console.log(resposta.body);
            console.log(resposta.status);

            expect(resposta.status).to.equal(400);
        });

    })

})
