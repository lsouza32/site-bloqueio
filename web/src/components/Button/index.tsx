"use client";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import { ModalConfirm } from "../ModalConfirm";
import { notificationError, notificationSuccess } from "@/utils/functions";
import { handleSubmit } from "@/utils/api";

interface ButtonProps {
  title: string;
  sala: string;
  vlan: number;
}

export function Button({ title, sala, vlan }: ButtonProps) {
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [actionButton, setActionButton] = useState(title);
 

  const handleShowModalConfirm = () => {
    setShowModalConfirm(true);
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
          handleSubmit= {()=>handleSubmit(vlan, actionButton)}
          /> 
      }
    </>
    );
}