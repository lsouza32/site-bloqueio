import fs from 'fs'; // Módulo para manipulação de arquivos


function checkIfFileExists(directoryPath, fileName) {// funcao para verificar se existe um determinado arquivo, sem precisar informar o nome completo

  const files = fs.readdirSync(directoryPath);
  const matchingFiles = files.filter((file) => file.includes(fileName));// Procura por arquivos que contenha o fileName no nome

  return matchingFiles; // retorna o arquivo encontrado
}


export function removeFiles(directoryPath, fileName){
  const file = checkIfFileExists(directoryPath, fileName);

  if(file.length > 0){// verificar se existe o arquivo 
    fs.rm(`${directoryPath}/${file}`, (err)=>{ // remove o arquivo
      if(err){// dispara erro se nao conseguir excluir o arquivo
        console.error(err.message);
        return;
      }
    });
  }
}
