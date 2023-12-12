// routerAuthentication.js
import express from 'express';
import ldap from 'ldapjs';
import jwt from 'jsonwebtoken';
import { hasPermission } from '../functions/hasPermission.js';

const routerAuthentication = express.Router();

// Autenticação
routerAuthentication.post('/authenticate', async (req, res) => {
  const { user, password } = req.body;
  let client;
  let userAdmin;

  try {
    // Verifica se o usuário tem permissão
    if (await hasPermission('./users/users.txt', user)) {
      // verificar admin
      if(await hasPermission('./users/usersAdmin.txt', user)){
        userAdmin = true
      }else{ userAdmin = false}

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
            expiresIn: 21600, // Tempo de expiração do token em segundo (atual:6h)
          };
          const payload = {
            user: user,
            userAdmin: userAdmin,
          };
          const token = jwt.sign(payload, secretKey, options);
          
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

routerAuthentication.get('/verify-token', (req, res) => {
  // Aqui você pode verificar a presença do token nos headers da requisição
  const token = req.headers.authorization?.split(' ')[1]; // Assume que o token está no formato "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  // Aqui você pode realizar a validação do token, por exemplo, usando a biblioteca jsonwebtoken
  try {
    const secretKey = 'c3e5c8f7a0b2e4d6a1b4f8c5e9d2a7b1'; // A mesma chave usada para assinar o token
    const decodedToken = jwt.verify(token, secretKey);

    // A partir daqui, você pode acessar as informações adicionais do payload
    const user = decodedToken.user;
    const userAdmin = decodedToken.userAdmin;
    return res.status(200).json({ message: 'Token válido', userAdmin });
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
});

export default routerAuthentication;
