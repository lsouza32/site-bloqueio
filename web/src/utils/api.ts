// api.ts

import { notificationError, notificationSuccess } from "./functions";

export const fetchSalas = async (setSalas: React.Dispatch<React.SetStateAction<any[]>>) => {
  try {
    // Fazer a chamada à API para buscar as salas
    const response = await fetch('http://localhost:3001/api/db/salas', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar as salas');
    }

    const data = await response.json();
    setSalas(data);
  } catch (error) {
    console.error('Erro ao buscar as salas:', error);
    // Tratar erro, se necessário
  }
};

// apiFunctions.js

export const handleSubmit = async (vlan: number, actionButton: string, toggleBlocked?: ()=> void) => {
  try {
    const dataToSend = {
      vlan: vlan,
      action: actionButton,
    };

    const response = await fetch(`http://localhost:3001/api/actions/${actionButton.replace(/\s/g, '-').toLowerCase()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      notificationSuccess('Requisição enviada com sucesso!');
      if (toggleBlocked) {
        toggleBlocked();
      }
    } else {
      notificationError('Falha no envio da requisição');
      console.error('Falha ao enviar os dados para o backend.');
    }
  } catch (error) {
    notificationError('Falha no envio da requisição');
    console.error('Erro ao enviar os dados para o backend:', error);
  }
};
