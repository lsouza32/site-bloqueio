import express from 'express';
import fs from 'fs'; // Módulo para manipulação de arquivos
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { executeShellScript } from './functions/executeSSHCommand.js'
import { removeFiles } from './functions/removeFiles.js';

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
