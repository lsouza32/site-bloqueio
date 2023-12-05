"use client";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import { ModalConfirm } from "../ModalConfirm";

interface ButtonProps {
  title: string;
  sala: string;
  vlan: number;
}

export function Button({ title, sala, vlan }: ButtonProps) {
  const [showModalConfirm, setShowModalConfirm] = useState(false);
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
        // Coloque aqui as informações que você deseja enviar para o backend
        vlan: vlan, //vlan do lab
        action: actionButton //acao a ser feita
      };

      // Enviar a requisição POST para o backend
      const response = await fetch(`http://localhost:3001/api/actions/${actionButton.replace(/\s/g, '-').toLowerCase()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),        
        
      });

      // Verificar se a requisição foi bem-sucedida
      if (response.ok) {
        notificationSuccess();
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
        <button className={'bg-yellow-50 hover:bg-yellow-300 px-4 py-2 rounded font-sans'}
        
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