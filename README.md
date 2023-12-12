# Gerenciador de laboratórios

![GitHub repo size](https://img.shields.io/github/repo-size/lsouza32/site-bloqueio?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/lsouza32/site-bloqueio?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/lsouza32/site-bloqueio?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/lsouza32/site-bloqueio?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/lsouza32/site-bloqueio?style=for-the-badge)


> Serviço para gerenciamento de laboratórios

## 🚀 Instalando 

Para instalar o gerenciador, siga estas etapas:

### Clone esse repositório:
```bash
$ git clone https://github.com/lsouza32/site-bloqueio
```

### Entre no diretório do projeto:
```bash
$ cd site-bloqueio
```

## Em cada diretório do projeto instale as dependências e inicie as aplicações:

### Server
```bash
$ cd server
$ node index.js
```

### Front-end
```bash
$ cd web
$ npm install
$ npm run dev
```

## ☕ Detalhes adicionais:

### Para acessar a IDE do banco de dados (não necessário):
```bash
$ cd server
$ npx prisma studio
```

### Arquivo Users:
Os arquivos users.txt e usersAdmin.txt devem sempre estar presentes.

### Rotas (/server/routes):
- /routerActions.js -> Rotas de ações dos botões, como bloquear internet. Contém o ip de acesso SSH.
- /routerAuthentication.js -> Rota de autenticação. Contém a solicitação via LDAP.
- /routerDB.js -> Rotas do CRUD do banco de dados.
- ../index -> Arquivo de criação do servidor. Contém IP e porta do servidor.

### Utils (/web/utils)
- /api.ts -> Contém as chamadas para o server
- /BDEndpoints -> Contém as chamadas para o banco de dados.
- /functions -> Contém algumas funções básicas, usado para melhor organização.

