import fs from 'fs'; // Módulo para manipulação de arquivos

export function removeFiles(directoryPath, fileName){
  
    fs.rm(`${directoryPath}/${fileName}`, (err)=>{ // remove o arquivo
      if(err){// dispara erro se nao conseguir excluir o arquivo
        console.log(`${directoryPath}/${fileName}`)
        console.error('Erro ao excluir arquivo:'+ err.message);
       
        return;
      }
    });
  
}
