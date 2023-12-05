// routerActions.js
import express from 'express';
import fs from 'fs';
import { executeShellScript } from '../functions/executeSSHCommand.js';
import { removeFiles } from '../functions/removeFiles.js';

const routerActions = express.Router();

// Bloquear rede
routerActions.post('/bloquear-rede', async (req, res) => {
  try {
    const { vlan } = req.body;
    const fileContent = '';
    fs.writeFileSync(`comandos/${vlan}.html`, fileContent);
    res.status(200).json({ message: 'Comando executado com sucesso!' });
  } catch (error) {
    console.error('Erro ao executar comando:', error);
    res.status(500).json({ error: 'Erro ao executar comando.' });
  }
});

// Desbloquear rede
routerActions.post('/desbloquear-rede', async (req, res) => {
  try {
    const { vlan } = req.body;
    removeFiles('comandos', `${vlan}.html`);
    res.status(200).json({ message: 'Comando executado com sucesso!' });
  } catch (error) {
    console.error('Erro ao executar comando:', error);
    res.status(500).json({ error: 'Erro ao executar comando.' });
  }
});

// Limpar Prova
routerActions.post('/apagar-usuario-prova', async (req, res) => {
  try {
    const { vlan } = req.body;
    const fileContent = '';
    fs.writeFileSync(`comandos/limpa-${vlan}.html`, fileContent);
    res.status(200).json({ message: 'Comando executado com sucesso!' });
  } catch (error) {
    console.error('Erro ao executar comando:', error);
    res.status(500).json({ error: 'Erro ao executar comando.' });
  }
});

// Iniciar em Linux
routerActions.post('/iniciar-linux', async (req, res) => {
  try {
    const { vlan } = req.body;
    const fileContent = '';
    fs.writeFileSync(`comandos/linux-${vlan}.html`, fileContent);
    let scriptContent = `sudo ssh root@10.10.0.11 -o StrictHostKeyChecking=no -C /root/scripts/acordar.sh " ${vlan} ." >/dev/null &`;
    await executeShellScript(scriptContent);
    res.status(200).json({ message: 'Comando executado com sucesso!' });
  } catch (error) {
    console.error('Erro ao executar comando:', error);
    res.status(500).json({ error: 'Erro ao executar comando.' });
  }
});

// Desligar Computadores
routerActions.post('/desligar-computadores', async (req, res) => {
  try {
    const { vlan } = req.body;
    const ip = `10.10.${vlan}.`;
    for (let i = 2; i <= 250; i++) {
      let scriptContent = `sudo ssh root@" ${ip}${i} ." -o StrictHostKeyChecking=no -o GlobalKnownHostsFile=/dev/null -o UserKnownHostsFile=/dev/null -C 'shutdown -h now & shutdown /t 1 /s /f' >/dev/null &`;
      await executeShellScript(scriptContent);
    }
    res.status(200).json({ message: 'Comando executado com sucesso!' });
  } catch (error) {
    console.error('Erro ao executar comando:', error);
    res.status(500).json({ error: 'Erro ao executar comando.' });
  }
});

// Reiniciar Computadores
routerActions.post('/reiniciar-computadores', async (req, res) => {
  try {
    const { vlan } = req.body;
    const ip = `10.10.${vlan}.`;
    for (let i = 2; i <= 250; i++) {
      let scriptContent = `sudo ssh root@" ${ip}${i} ." -o StrictHostKeyChecking=no -o GlobalKnownHostsFile=/dev/null -o UserKnownHostsFile=/dev/null -C 'shutdown -r now & shutdown /t 1 /r /f ' >/dev/null &`;
      await executeShellScript(scriptContent);
    }
    res.status(200).json({ message: 'Comando executado com sucesso!' });
  } catch (error) {
    console.error('Erro ao executar comando:', error);
    res.status(500).json({ error: 'Erro ao executar comando.' });
  }
});

// Iniciar em Windows
routerActions.post('/iniciar-windows', async (req, res) => {
  try {
    const { vlan } = req.body;
    removeFiles('comandos', `linux-${vlan}.html`);
    let scriptContent = `sudo ssh root@10.10.0.11 -o StrictHostKeyChecking=no -C /root/scripts/acordar.sh " ${vlan} ." >/dev/null &`;
    await executeShellScript(scriptContent);
    res.status(200).json({ message: 'Comando executado com sucesso!' });
  } catch (error) {
    console.error('Erro ao executar comando:', error);
    res.status(500).json({ error: 'Erro ao executar comando.' });
  }
});

export default routerActions;
