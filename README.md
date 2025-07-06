# banco-api-tests

## Objetivo
Este projeto tem como finalidade automatizar os testes da API REST disponível em **[banco-api](https://github.com/juliodelimas/banco-api)**. Ele valida endpoints, schema, status codes, fluxos de autenticação, criação, leitura, atualização e deleção de dados (CRUD).

## Stack Utilizada
- **Linguagem**: JavaScript (Node.js)
- **Testes**: [Mocha](https://mochajs.org/)
- **Requisições HTTP**: [Supertest](https://github.com/visionmedia/supertest)
- **Asserções**: [Chai](https://www.chaijs.com/)
- **Relatórios**: [Mochawesome](https://www.npmjs.com/package/mochawesome)
- **Variáveis de ambiente**: [.env](https://github.com/motdotla/dotenv)

## Estrutura de Diretórios

```
banco-api-tests/
├── test/                  # Testes organizados por funcionalidade
│   ├── login.test.js
│   ├── transferencias.test.js
├── mochawesome/           ← relatórios HTML gerados após execução
├── .env                   # Arquivo para configuração da variável BASE_URL
├── .gitignore
├── package.json
└── README.md
```

## .env
Crie um arquivo `.env` na raiz com o seguinte conteúdo (sem aspas):

```
BASE_URL=http://localhost:3000
```

Use a URL da API que deseja testar (pode ser localhost ou ambiente remoto).

## Instalação & Execução

1. Instale as dependências:

```bash
npm install
```

2. Configure seu `.env` com `BASE_URL`

3. Execute os testes:

```bash
npm test
```

Isso rodará o Mocha executando os testes em `test/`, gerando também relatório JSON e HTML via Mochawesome.

## Relatórios

Ao finalizar, será gerado o relatório automatizado pelo Mochawesome no diretório `mochawesome/`. Abra o `mochawesome/mochawesome.html` para visualizar o relatório completo de testes.

## Documentações
- [Mocha](https://mochajs.org/) - Framework de execução de testes
- [Supertest](https://github.com/visionmedia/supertest) - Biblioteca para chamadas HTTP
- [Chai](https://www.chaijs.com/) - Biblioteca de asserções
- [Mochawesome](https://www.npmjs.com/package/mochawesome) - Geração de relatórios em HTML
- [dotenv (.env)](https://github.com/motdotla/dotenv) - Gerenciamento de variáveis de ambiente

