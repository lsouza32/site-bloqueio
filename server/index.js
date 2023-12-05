import express from 'express';
import cors from 'cors';
import http from 'node:http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import routerActions from './routes/routerActions.js';
import routerAuthentication from './routes/routerAuthentication.js';

const app = express();
const port = 3001;
const server = http.createServer(app);


const corsOptions = {
  origin: 'http://localhost:3000', // Substitua pelo endereço do seu frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Habilita o uso de credenciais (cookies, tokens) durante a solicitação
};


// Middleware para interpretar o corpo da requisição como JSON
app.use(cors(corsOptions));
app.use(express.json());

// Configurar rota para servir arquivos estáticos na sub-rota /comandos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const comandosFolderPath = join(__dirname, 'comandos');
app.use('/comandos', express.static(comandosFolderPath));

//utilizando as rotas da pasta routes
app.use('/api/actions', routerActions);
app.use('/api/authentication', routerAuthentication);


server.listen(port, () => {
  console.log(` 🚀 Servidor rodando em http://localhost:${port} 🚀`);
});


