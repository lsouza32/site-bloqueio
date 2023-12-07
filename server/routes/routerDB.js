// routes/routerDB.js
import express from 'express';
import { PrismaClient } from '../prisma/prisma/client/index.js';

const routerDB = express.Router();
const prisma = new PrismaClient();

// Endpoint de criação (create)
routerDB.post('/create', async (req, res) => {
  const { vlan, isBlocked } = req.body;
  try {
    const result = await prisma.salas.create({
      data: {
        vlan,
        isBlocked,
      },
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o registro.' });
  }
});

// Endpoint de leitura (read) baseado na VLAN
routerDB.get('/read/:vlan', async (req, res) => {
  const vlan = parseInt(req.params.vlan);
  try {
    const result = await prisma.salas.findUnique({
      where: {
        vlan,
      },
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o registro.' });
  }
});


// Endpoint de atualização (update) baseado na VLAN
routerDB.put('/update/:vlan', async (req, res) => {
  const vlan = parseInt(req.params.vlan);
  const { isBlocked } = req.body;
  try {
    const result = await prisma.salas.update({
      where: {
        vlan,
      },
      data: {
        isBlocked,
      },
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o registro.' });
  }
});


routerDB.get('/salas', async (req, res) => {
  try {
    // Faça a consulta ao banco de dados
    const salas = await prisma.salas.findMany();

    // Envie os dados como resposta
    res.json(salas);
  } catch (error) {
    console.error('Erro ao buscar as salas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default routerDB;
