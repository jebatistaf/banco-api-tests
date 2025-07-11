// Importar dependências necessárias
const request = require('supertest'); // Importar supertest para fazer requisições HTTP
const postLogin = require('../fixtures/postLogin.json') // Importar dados de login

/**
 * Função para obter token de autenticação
 * @param {string} usuario - Nome do usuário
 * @param {string} senha - Senha do usuário
 * @returns {Promise<string>} Token de autenticação
 */
const obterToken = async(usuario, senha) => {
    // Criar objeto com dados de login
    const bodyLogin = { ... postLogin }
    
    // Fazer requisição POST para /login
    const respostaLogin = await request(process.env.BASE_URL) // Definir base url
        .post('/login') // Definir endpoint login
        .set('Content-Type', 'application/json') // Definir header Content-Type
        .send(bodyLogin) // Enviar dados no corpo da requisição
                
    // Retornar token da resposta
    return respostaLogin.body.token
}

// Exportar função para uso em outros módulos
module.exports = {
    obterToken
}