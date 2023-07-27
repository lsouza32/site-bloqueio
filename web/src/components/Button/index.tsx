"use client";
import React, { useState } from "react";
import { ModalConfirm } from "../ModalConfirm";

interface ButtonProps {
  title: string;
  sala: string;
  vlan: number;

}

export function Button({ title, sala, vlan }: ButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleSubmit = async () => {
    
    try {
      const dataToSend = {
        // Coloque aqui as informações que você deseja enviar para o backend
        vlan: vlan, //vlan do lab
        action: title //acao a ser feita
      };

      // Enviar a requisição POST para o backend
      const response = await fetch(`http://localhost:3001/api/gerenciaLab`, {
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
      } else {
        console.error('Falha ao enviar os dados para o backend.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados para o backend:', error);
    }
  };

  return (
    <>
      <button className="bg-yellow-50 text-white px-4 py-2 rounded hover:bg-yellow-300" 
        type="button" 
        onClick={handleShowModal}>

        {title}
      </button>

    {showModal && 
      <ModalConfirm 
        setShowModal={setShowModal}
        titleAction={title}
        sala={sala} 
        handleSubmit= {handleSubmit}/> 
    }

  </>
  );
}