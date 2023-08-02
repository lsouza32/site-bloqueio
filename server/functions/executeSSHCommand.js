import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function executeShellScript(scriptContent) {
  try {
    const { stdout, stderr } = await execAsync(scriptContent);
    console.log('Saída:', stdout);
    console.error('Erros:', stderr);
    return stdout;
  } catch (error) {
    console.error('Erro ao executar o script:', error);
    throw error;
  }
}
