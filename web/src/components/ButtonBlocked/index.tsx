"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { ModalConfirm } from "../ModalConfirm";
import socketIOClient from 'socket.io-client';

interface ButtonBlockedProps {
  title: string;
  sala: string;
  vlan: number;

}

export function ButtonBlocked({ title, sala, vlan }: ButtonBlockedProps) {
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [actionButton, setActionButton] = useState(title);
 

  const notificationSuccess = async () => { // Usando o toast para retornar uma mensagem de sucesso
    toast.success('Requisição enviada com sucesso!');
  };

  const notificationError = async () => { // Usando o toast para retornar uma mensagem de erro
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
  
      const response = await fetch(`http://localhost:3001/api/gerenciaLab`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (response.ok) {
        notificationSuccess();
        // Atualiza o estado com base no estado anterior
        setIsBlocked((prevIsBlocked) => !prevIsBlocked);
        // Usa o estado atualizado para definir o actionButton
        setActionButton((prevActionButton) =>
        !prevActionButton.includes('Desbloquear') ? 'Desbloquear rede' : 'Bloquear rede'
      );
      
      } else {
        notificationError();
        console.error('Falha ao enviar os dados para o backend.');
      }
    } catch (error) {
      setIsBlocked(false);
      notificationError();
      console.error('Erro ao enviar os dados para o backend:', error);
    }
  };
  
  

    return (
      <>
        <button className={` ${isBlocked ? 'bg-black-50 text-yellow-50 hover:bg-gray-700 ' : 'bg-yellow-50 hover:bg-yellow-300' } px-4 py-2 rounded font-sans`}
        
          type="button" 
          onClick={()=>{
              handleShowModalConfirm();
          }}>
          {actionButton}
        </button>

      {showModalConfirm && 
        <ModalConfirm 
          setShowModalConfirm={setShowModalConfirm}
          titleAction={actionButton}
          sala={sala} 
          handleSubmit= {handleSubmit}
          /> 
      }
    </>
    );
}