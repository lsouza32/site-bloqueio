// ButtonBlocked.tsx

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { ModalConfirm } from '../ModalConfirm';
import { readVlan, updateVlan} from '../../utils/BDEndpoints'

interface ButtonBlockedProps {
  title: string;
  sala: string;
  vlan: number;
}

export function ButtonBlocked({ title, sala, vlan }: ButtonBlockedProps) {

  const [actionButton, setActionButton] = useState(title);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    readVlan(vlan)
      .then((data) => setIsBlocked(data.isBlocked))
      .catch((error) => console.error('Falha ao ler a VLAN:', error));
  }, [vlan]);

  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const toggleBlocked = async () => {
    const newIsBlocked = !isBlocked;
    try {
      // Atualizar o estado isBlocked no banco de dados
      await updateVlan(vlan, newIsBlocked);
      setIsBlocked(newIsBlocked);
      setActionButton((prevActionButton) =>
        !prevActionButton.includes('Desbloquear') ? 'Desbloquear rede' : 'Bloquear rede'
      );
    } catch (error) {
      console.error('Falha ao atualizar a VLAN:', error);
    }
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

