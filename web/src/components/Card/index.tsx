import { Button } from "../Button";

interface CardProps {
  sala: string
}

export function Card({ sala }: CardProps) {
  return (

    //Div do card
    <div className="bg-white-100 border-gray-800 border-2 p-4 m-4 w-300 h-400 rounded-lg">
    {/* Nome da sala no topo do card */}
    <h3 className="text-white font-bold text-xl mb-4">Laboratório: {sala}</h3>

    {/* Botões do card */}
    <div className="flex flex-col gap-4">
      
      <Button title="Bloquear a rede" sala={sala}/>      
      <Button title="Desligar Computadores" sala={sala}/>      
      <Button title="Reiniciar Computradores" sala={sala}/>
      <Button title="Iniciar em Windows" sala={sala}/>
      <Button title="Iniciar em Linux" sala={sala}/>
      <Button title="Limpar Prova" sala={sala}/>

    </div>
  </div>

  );
}
