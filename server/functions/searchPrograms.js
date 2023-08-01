import fs from 'fs'; // Módulo para manipulação de arquivos

export function obterProgramasPorSala(arquivo, salaBuscada) {
  try {
    const conteudo = fs.readFileSync(arquivo, 'utf-8');
    const linhas = conteudo.split('\n');

    let resultado = {
      Sala: {},
      Programas: [],
    };

    let salaAtual = '';
    let encontrouSala = false;

    for (let linha of linhas) {
      if (linha.trim() === salaBuscada) {
        salaAtual = linha;
        encontrouSala = true;
      } else if (encontrouSala && linha.trim() !== '') {
        resultado.Programas.push(linha.trim());
      } else {
        encontrouSala = false;
      }
    }

    if (salaAtual !== '' && resultado.Programas.length > 0) {
      resultado.Sala[salaAtual] = null;
    }

    return resultado;
  } catch (error) {
    console.error('Erro ao ler o arquivo:', error);
    return null;
  }
}


