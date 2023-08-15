import { promises as fsPromises } from 'fs';

export async function hasPermission(filePath, username) {
  try {
    const data = await fsPromises.readFile(filePath, 'utf8');
    const users = data.split('\n').map(user => user.trim()); // Remove espaços em branco e quebras de linha

    return users.includes(username);
  } catch (error) {
    console.error('Erro ao ler o arquivo:', error);
    return false;
  }
}
