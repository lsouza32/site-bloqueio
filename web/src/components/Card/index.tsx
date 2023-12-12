// Card.tsx

import React, { ReactNode } from 'react';
import { Button } from '../Button';
import { ButtonBlocked } from '../ButtonBlocked';
interface CardProps {
  sala: string;
  vlan: number;
  salaBlocked: boolean;
}

export function Card({ sala, vlan, salaBlocked }: CardProps) {
  return (
    <>
      <div className="bg-white-100 border-gray-800 border-2 p-4 m-4 w-300 h-400 rounded-lg">
        <h3 className="text-white font-sans font-bold text-xl mb-4">Laboratório: {sala}</h3>
        <div className="flex flex-col gap-4">
          <ButtonBlocked title="Bloquear rede" sala={sala} vlan={vlan} salaBlocked={salaBlocked} />
          <Button title="Desligar Computadores" sala={sala} vlan={vlan} />
          <Button title="Reiniciar Computadores" sala={sala} vlan={vlan} />
          <Button title="Iniciar em Windows" sala={sala} vlan={vlan} />
          <Button title="Iniciar em Linux" sala={sala} vlan={vlan} />
          <Button title="Apagar Usuário Prova" sala={sala} vlan={vlan} />
        </div>
      </div>
    </>
  );
}
