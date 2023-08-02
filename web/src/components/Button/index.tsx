"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { ModalConfirm } from "../ModalConfirm";
import { ModalPrograms } from "../ModalPrograms";

interface ButtonProps {
  title: string;
  sala: string;
  vlan: number;

}

export function Button({ title, sala, vlan }: ButtonProps) {
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalPrograms, setShowModalPrograms] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [actionButton, setActionButton] = useState(title);
 

  const notificationSuccess = async () => { // Usando o toast para retornar uma mensagem de sucesso
    toast.success('Requisição enviada com sucesso!');
  };

  const notificationError = async () => { // Usando o toast para retornar uma mensagem de erro
    toast.error('Falha no envio da requisição');
  };

  const handleShowMoldalPrograms = () => {
    setShowModalPrograms(true);
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
      const response = await fetch(`http://10.10.17.1:3001/api/gerenciaLab`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),        
        
      });
      console.log(JSON.stringify(dataToSend));

      // Verificar se a requisição foi bem-sucedida
      if (response.ok) {
        console.log('Dados enviados com sucesso!');
        notificationSuccess();
      } else {
        notificationError();
        console.error('Falha ao enviar os dados para o backend.');
      }
    } catch (error) {
      setIsBlocked(false)
      notificationError();
      console.error('Erro ao enviar os dados para o backend:', error);
    }
  };


    return (
      <>

        <button className={` ${isBlocked ? 'bg-black-50 text-yellow-50 hover:bg-gray-700 ' : 'bg-yellow-50 hover:bg-yellow-300' } px-4 py-2 rounded font-sans`}
        
          type="button" 
          onClick={()=>{
            if(actionButton==='Programas Disponíveis'){
              handleShowMoldalPrograms();
            }else{
              handleShowModalConfirm();
            }
          }}>
  
          {actionButton}
        </button>

      {showModalConfirm && 
        <ModalConfirm 
          setShowModalConfirm={setShowModalConfirm}
          setIsBlocked={setIsBlocked}
          setActionButton= {setActionButton}
          titleAction={actionButton}
          sala={sala} 
          handleSubmit= {handleSubmit}
          /> 
      }

      {showModalPrograms && 
        <ModalPrograms 
        sala={sala}
        setShowModalPrograms={setShowModalPrograms}/>
      }
    </>
    );
}
