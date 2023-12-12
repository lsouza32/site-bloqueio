// ButtonBlocked.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import { ModalConfirm } from '../ModalConfirm';
import { readVlan, updateVlan} from '../../utils/BDEndpoints'
import { notificationError, notificationSuccess } from '@/utils/functions';

interface ButtonBlockedProps {
  title: string;
  sala: string;
  vlan: number;
  salaBlocked: boolean;
}

export function ButtonBlocked({ title, sala, vlan, salaBlocked }: ButtonBlockedProps) {

  const [actionButton, setActionButton] = useState(title);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(()=>{
    setIsBlocked(salaBlocked)
  }, [salaBlocked])

  useEffect(() => {
    readVlan(vlan)
      .then((data) => setIsBlocked(data.isBlocked))
      .catch((error) => console.error('Falha ao ler a VLAN:', error));
  }, [vlan]);

  useEffect(()=>{
    if(isBlocked){
      setActionButton('Desbloquear rede')
    }else{
      setActionButton('Bloquear rede')
    }
  }, [isBlocked])

  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const toggleBlocked = useCallback(async () => {
    const newIsBlocked = !isBlocked;
    try {
      // Atualizar o estado isBlocked no banco de dados
      await updateVlan(vlan, newIsBlocked);
      setIsBlocked(newIsBlocked);
    } catch (error) {
      console.error('Falha ao atualizar a VLAN:', error);
    }
   }, [isBlocked, vlan]);
   
  
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
        notificationSuccess("Requisição enviada com sucesso!");
        toggleBlocked();
      } else {
        notificationError('Falha no envio da requisição');
        console.error('Falha ao enviar os dados para o backend.');
      }
    } catch (error) {
      notificationError('Falha no envio da requisição');
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

