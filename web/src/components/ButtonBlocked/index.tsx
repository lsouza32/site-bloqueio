// ButtonBlocked.tsx

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ModalConfirm } from '../ModalConfirm';

interface ButtonBlockedProps {
  title: string;
  sala: string;
  vlan: number;
}



export function ButtonBlocked({ title, sala, vlan }: ButtonBlockedProps) {
  const [actionButton, setActionButton] = useState(() => {
    const storedAction = localStorage.getItem('actionButton');
    return storedAction || 'Bloquear rede';
  });

  const [isBlocked, setIsBlocked] = useState(() => {
    const storedState = localStorage.getItem('isBlocked');
    return storedState ? JSON.parse(storedState) : false;
  });
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const toggleBlocked = () => {
    setIsBlocked((prevIsBlocked: boolean) => !prevIsBlocked);
    setActionButton((prevActionButton) =>
      !prevActionButton.includes('Desbloquear') ? 'Desbloquear rede' : 'Bloquear rede'
    );
  };
  
  const notificationSuccess = async () => {
    toast.success('Requisição enviada com sucesso!');
  };

  const notificationError = async () => {
    toast.error('Falha no envio da requisição');
  };

  const handleShowModalConfirm = () => {
    setShowModalConfirm(true);
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        vlan: vlan,
        action: actionButton,
      };

      const response = await fetch(`http://localhost:3001/api/actions/${actionButton.replace(/\s/g, '-').toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        notificationSuccess();
        toggleBlocked();
      } else {
        notificationError();
        console.error('Falha ao enviar os dados para o backend.');
      }
    } catch (error) {
      notificationError();
      console.error('Erro ao enviar os dados para o backend:', error);
    }
  };

  return (
    <>
      <button
        className={` ${isBlocked ? 'bg-black-50 text-yellow-50 hover:bg-gray-700 ' : 'bg-yellow-50 hover:bg-yellow-300' } px-4 py-2 rounded font-sans`}
        type="button"
        onClick={() => {
          handleShowModalConfirm();
        }}
      >
        {actionButton}
      </button>

      {showModalConfirm &&
        <ModalConfirm
          setShowModalConfirm={setShowModalConfirm}
          titleAction={actionButton}
          sala={sala}
          handleSubmit={handleSubmit}
        />
      }
    </>
  );
};

