import { exec } from 'child_process';

export function executeShellScript(scriptContent) {
  exec(scriptContent, (error, stdout, stderr) => {
    if (error) {
      console.error('Erro ao executar o script:', error);
      return;
    }
    console.log('Saída:', stdout);
    console.error('Erros:', stderr);
  });
}
