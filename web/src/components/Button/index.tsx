"use client";
import React, { useState } from "react";
import { ModalConfirm } from "../ModalConfirm";

interface ButtonProps {
  title: string;
  sala: string;
}

export function Button({ title, sala }: ButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <button className="bg-yellow-50 text-white px-4 py-2 rounded hover:bg-yellow-300" 
        type="button" 
        onClick={handleButtonClick}>

        {title}
      </button>

    {showModal && 
      <ModalConfirm 
        setShowModal={setShowModal}
        titleAction={title}
        sala={sala} /> 
    }

  </>
  );
}
