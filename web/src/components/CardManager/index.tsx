import { deleteVlan } from '@/utils/BDEndpoints';
import { notificationError, notificationSuccess } from '@/utils/functions';
import { ReactNode, useState } from 'react';

interface CardManagerProps {
  sala: string;
  vlan: number;
  isNew: boolean;
  deleteVlans: number[];
  setDeleteVlans: React.Dispatch<React.SetStateAction<number[]>>;
}

export function CardManager({ sala, vlan, deleteVlans, setDeleteVlans, isNew }: CardManagerProps) {

  function handleDelete(vlan: number) {
    //salva as vlans a serem excluidas
    const novoArray: number[] = [...deleteVlans, vlan];
    setDeleteVlans(novoArray);
  }

  const isVlanMarkedForDeletion = deleteVlans.includes(vlan);
  const cardClassName = `border p-4 m-4 w-300 h-400 rounded-lg ${
    isVlanMarkedForDeletion ? 'border-red-500 bg-red-50' : (isNew ? 'bg-emerald-300' : 'bg-white-100')
  }`;
  
  
  return (
    <>     
      <div className={cardClassName}>
        <h3 className="text-white font-sans font-bold text-base ">Laboratório: {sala}</h3>
        <p className=" text-slate-700 text-sm leading-relaxed mb-2 text-center">Vlan: {vlan}</p>
        <div className="flex flex-col gap-4">
          {!isNew && (
            <button 
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={()=>handleDelete(vlan)}
            >Excluir</button>
          )}


        </div>
      </div>
      
    </>
  );
}
