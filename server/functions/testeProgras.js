// Exemplo de uso
import { obterProgramasPorSala } from '../functions/searchPrograms.js';



const nomeArquivo = '../programsDB/programas.txt';
const nomeSala = 'N005';

const result = obterProgramasPorSala(nomeArquivo, nomeSala);

console.log(result.Programas);