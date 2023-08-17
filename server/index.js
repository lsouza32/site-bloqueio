import express from 'express';
import fs from 'fs'; // Módulo para manipulação de arquivos
import cors from 'cors';
import ldap from 'ldapjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import jwt from 'jsonwebtoken';

import { executeShellScript } from './functions/executeSSHCommand.js'
import { removeFiles } from './functions/removeFiles.js';
import { hasPermission } from './functions/hasPermission.js';


const app = express();
const port = 3001;

// Middleware para interpretar o corpo da requisição como JSON
app.use(express.json());
app.use(cors());

// Configurar rota para servir arquivos estáticos na sub-rota /comandos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const comandosFolderPath = join(__dirname, 'comandos');
app.use('/comandos', express.static(comandosFolderPath));

app.listen(port, () => {
  console.log(` 🚀 Servidor rodando em http://localhost:${port} 🚀`);
});

// ------------ Sistema de gerenciamento do lab
app.post('/api/gerenciaLab', async (req, res) => {
  try {
    const { vlan, action } = req.body; // As informações enviadas pelo frontend
    const ip = `10.10.${vlan}.`;

    if (action === 'Bloquear a rede') {
      const fileContent = ''; // Conteudo do arquivo
      fs.writeFileSync(`comandos/${vlan}.html`, fileContent); // Criar arquivo com o conteudo 'fileContent'.
    }

    if (action === 'Desbloquear rede') {
      removeFiles('comandos', `${vlan}.html`)
    }

    if (action === 'Limpar Prova') {
      const fileContent = ''; // Conteudo do arquivo
      fs.writeFileSync(`comandos/limpa-${vlan}.html`, fileContent); // Criar arquivo com o conteudo 'fileContent'.
    }

    if (action === 'Iniciar em Linux') {
      const fileContent = ''; // inicia o arquivo em branco
      fs.writeFileSync(`comandos/linux-${vlan}.html`, fileContent); // Criar arquivo com o conteudo 'fileContent'.
      let scriptContent = `sudo ssh root@10.10.0.11 -o StrictHostKeyChecking=no -C /root/scripts/acordar.sh " ${vlan} ." >/dev/null &`;
      await executeShellScript(scriptContent);
    }

    if (action === 'Desligar Computadores') {
      for (let i = 2; i <= 250; i++) {
        // script a ser rodado
        let scriptContent = `sudo ssh root@" ${ip}${i} ." -o StrictHostKeyChecking=no -o GlobalKnownHostsFile=/dev/null -o UserKnownHostsFile=/dev/null -C 'shutdown -h now & shutdown /t 1 /s /f' >/dev/null &`;
        await executeShellScript(scriptContent);
      }
    }

    if (action === 'Reiniciar Computadores') {
      for (let i = 2; i <= 250; i++) {
        // script a ser rodado
        let scriptContent = `sudo ssh root@" ${ip}${i} ." -o StrictHostKeyChecking=no -o GlobalKnownHostsFile=/dev/null -o UserKnownHostsFile=/dev/null -C 'shutdown -r now & shutdown /t 1 /r /f ' >/dev/null &`;
        await executeShellScript(scriptContent);
      }
    }

    if (action === 'Iniciar em Windows') {
      removeFiles('comandos', `linux-${vlan}.html`) // Funcao verifica se existe comandos para iniciar em linux, se tiver, ele exclui o arquivo .html
      let scriptContent = `sudo ssh root@10.10.0.11 -o StrictHostKeyChecking=no -C /root/scripts/acordar.sh " ${vlan} ." >/dev/null &`; //script a ser rodado
      await executeShellScript(scriptContent);
    }

    res.status(200).json({ message: 'Comando executado com sucesso!' });
  } catch (error) {
    console.error('Erro ao executar comando:', error);
    res.status(500).json({ error: 'Erro ao executar comando.' });
  }
});



// -------------- Sistema de login usando LDAP
app.post('/authenticate', async (req, res) => {
  const { user, password } = req.body;
  let client;

  try {
    // Verifica se o usuário tem permissão
    if (await hasPermission('./users/users.txt', user)) {
      // Cria um cliente LDAP para se conectar ao servidor
      client = ldap.createClient({
        url: 'ldaps://10.10.0.6:636',
        tlsOptions: {
          rejectUnauthorized: false,
        },
      });

      const bindDN = `uid=${user},ou=alunos,dc=utfpr,dc=edu,dc=br`;

      // Trata eventos de erro do cliente LDAP
      client.on('error', (ldapError) => {
        console.error('LDAP Client Error:', ldapError);

        // Mapeia códigos de erro a mensagens de erro específicas
        const errorMessages = {
          UNABLE_TO_GET_ISSUER_CERT_LOCALLY: 'Certificado do servidor LDAP não confiável',
          DEPTH_ZERO_SELF_SIGNED_CERT: 'Certificado autoassinado do servidor LDAP',
          ERR_TLS_CERT_ALTNAME_INVALID: 'Nome alternativo inválido no certificado do servidor LDAP',
        };

        // Seleciona a mensagem de erro com base no código de erro
        const errorMessage = errorMessages[ldapError.code] || 'Erro na conexão com o servidor LDAP';

        // Retorna a mensagem de erro ao cliente
        return res.status(401).json({ message: errorMessage });
      });

      // Tenta autenticar o usuário no LDAP
      await new Promise((resolve, reject) => {
        client.bind(bindDN, password, err => {
          client.unbind();
          
          if (err) {
            // Retornar a Promise com uma rejeição em caso de erro
            return res.status(402).json({ message: 'Senha ou usuário inválido'});
          }
          
          // Autenticação bem-sucedida. Agora, vamos gerar um token JWT.
                
          const secretKey = 'c3e5c8f7a0b2e4d6a1b4f8c5e9d2a7b1'; // Troque por uma chave secreta mais segura
          const options = {
            expiresIn: '1h', // Tempo de expiração do token
          };
          const token = jwt.sign({user}, secretKey, options);
          
          // Resolva a Promise em caso de autenticação bem-sucedida
          resolve();
          //res.json({token});
          return res.status(200).json({ message: 'Authentication successful', token });
        });
      });

      
    } else {
      // Retorna mensagem de erro ao cliente se o usuário não tiver permissão
      return res.status(403).json({ message: 'Usuário sem permissão. Entre em contato com a COGETI'});
    }
  } catch (err) {
    console.error('Error:', err);
    // Retorna mensagem de erro interno ao cliente
    return res.status(500).json({ message: 'Erro interno do servidor' });
  } finally {
    // Certifica-se de desconectar o cliente mesmo em caso de erro
    if (client) {
      client.unbind();
    }
  }
});


app.get('/verify-token', (req, res) => {
  // Aqui você pode verificar a presença do token nos headers da requisição
  const token = req.headers.authorization?.split(' ')[1]; // Assume que o token está no formato "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  // Aqui você pode realizar a validação do token, por exemplo, usando a biblioteca jsonwebtoken
  try {
    const secretKey = 'c3e5c8f7a0b2e4d6a1b4f8c5e9d2a7b1'; // A mesma chave usada para assinar o token
    jwt.verify(token, secretKey);

    return res.status(200).json({ message: 'Token válido' });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
});

