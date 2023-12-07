// Função para criar VLAN
type dbTypes={
  vlan: number;
  isBlocked: boolean
}

async function createVlan(vlan: number) {
  const response = await fetch('http://localhost:3001/api/db/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      vlan,
      isBlocked: true, 
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
    // VLAN não encontrada, chamar a função createVlan
    await createVlan(vlan);
    // Agora, tentar novamente ler a VLAN recém-criada
    return readVlan(vlan);
  } else {
    throw new Error('Falha ao ler a VLAN');
  }
}

export async function updateVlan(vlan: number, isBlocked: boolean) {
  const response = await fetch(`http://localhost:3001/api/update/${vlan}`, {
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
