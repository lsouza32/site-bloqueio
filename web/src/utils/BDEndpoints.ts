// Função para criar VLAN

export async function createVlan(vlan: number, lab: string) {
  const response = await fetch('http://localhost:3001/api/db/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lab,
      vlan,
    }),
  });

  if (!response.ok) {
    throw new Error('Falha ao criar a VLAN');
  }
}

export async function readVlan(vlan: number) {
  const response = await fetch(`http://localhost:3001/api/db/read/${vlan}`);

  if (response.ok) {
    return response.json();
  } else if (response.status === 404) {
    throw new Error('VLAN não encontrada');
  } else {
    throw new Error('Falha ao ler a VLAN');
  }
}

export async function updateVlan(vlan: number, isBlocked: boolean) {
  const response = await fetch(`http://localhost:3001/api/db/update/${vlan}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isBlocked }),
  });

  if (!response.ok) {
    throw new Error('Falha ao atualizar a VLAN');
  }

  return response.json();
}

export async function deleteVlan(vlan: number) {
  try {
    const response = await fetch(`http://localhost:3001/api/db/delete/${vlan}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Falha ao excluir a VLAN');
    }

    // A resposta pode ser processada conforme necessário
    const result = await response.json();
    console.log('Registro excluído:', result);
  } catch (error) {
    throw new Error('Erro ao excluir vlan');
    // Ou manipule o erro de outra forma, conforme necessário
  }
}
