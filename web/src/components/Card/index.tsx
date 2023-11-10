import React, { ReactNode, createContext, useContext } from 'react';
import { Button } from '../Button';
import { ButtonBlocked } from '../ButtonBlocked';

interface CardProps {
  sala: string;
  vlan: number;
}

interface CardContextProps {
  sala: string;
  vlan: number;
}

interface CardProviderProps {
  children?: ReactNode;
}

// Criar um contexto para o Card
const CardContext = createContext<CardContextProps | undefined>(undefined);

export function Card({ sala, vlan }: CardProps) {
  const CardProvider = ({ children }: CardProviderProps) => (
    <CardContext.Provider value={{ sala, vlan }}>
      {children}
    </CardContext.Provider>
  );

  const useCardContext = (): CardContextProps => {
    const context = useContext(CardContext);
    if (!context) {
      throw new Error('useCardContext must be used within a CardProvider');
    }
    return context;
  };

  return (
    <CardProvider>
      {/* Div do card */}
      <div className="bg-white-100 border-gray-800 border-2 p-4 m-4 w-300 h-400 rounded-lg">
        {/* Nome da sala no topo do card */}
        <h3 className="text-white font-sans font-bold text-xl mb-4">Laboratório: {sala}</h3>

        {/* Botões do card */}
        <div className="flex flex-col gap-4">
          <ButtonBlocked title="Bloquear rede" sala={sala} vlan={vlan} />
          <Button title="Desligar Computadores" sala={sala} vlan={vlan} />
          <Button title="Reiniciar Computadores" sala={sala} vlan={vlan} />
          <Button title="Iniciar em Windows" sala={sala} vlan={vlan} />
          <Button title="Iniciar em Linux" sala={sala} vlan={vlan} />
          <Button title="Apagar Usuário Prova" sala={sala} vlan={vlan} />
        </div>
      </div>
    </CardProvider>
  );
}
