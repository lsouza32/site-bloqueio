export interface SalaType{
  lab: string;
  vlan: number;
  isBlocked: boolean;
}

export const agruparSalasPorBloco = (salas: SalaType[]) => {
  const salasPorBloco: Record<string, SalaType[]> = {};

  salas.forEach((sala) => {
    if (sala && sala.lab) {
      const bloco = sala.lab.charAt(0);

      if (!salasPorBloco[bloco]) {
        salasPorBloco[bloco] = [];
      }
      salasPorBloco[bloco].push(sala);
    }
  });

  // Ordenar os blocos por quantidade de salas em ordem decrescente
  const blocosOrdenados = Object.keys(salasPorBloco).sort((a, b) => {
    return salasPorBloco[b].length - salasPorBloco[a].length;
  });

  const salasAgrupadasOrdenadas: Record<string, SalaType[]> = {};
  blocosOrdenados.forEach((bloco) => {
    salasAgrupadasOrdenadas[bloco] = salasPorBloco[bloco].sort((a, b) => {
      // Ordenar as salas dentro de cada bloco em ordem crescente
      return parseInt(a.lab.slice(1)) - parseInt(b.lab.slice(1));
    });
  });

  return salasAgrupadasOrdenadas;
};