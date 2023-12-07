// api.ts

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
