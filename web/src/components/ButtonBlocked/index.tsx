// ButtonBlocked.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import { ModalConfirm } from '../ModalConfirm';
import { readVlan, updateVlan} from '../../utils/BDEndpoints'
import { notificationError, notificationSuccess } from '@/utils/functions';
import { handleSubmit } from '@/utils/api';

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
          handleSubmit= {()=>handleSubmit(vlan, actionButton, toggleBlocked)}
        />
      }
    </>
  );
};

