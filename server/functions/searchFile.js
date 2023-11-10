import fs from 'fs';
import path from 'path';

const searchFile = (fileName) => {
  const folderPath = path.join(__dirname, '..', 'comandos'); // Constrói o caminho da pasta comandos

  // Adiciona a extensão .html ao nome do arquivo
  const filePath = path.join(folderPath, `${fileName}.html`);

  try {
    // Verifica se o arquivo existe
    fs.accessSync(filePath, fs.constants.F_OK);
    return true; // Arquivo encontrado
  } catch (err) {
    return false; // Arquivo não encontrado
  }
};

export default searchFile;
