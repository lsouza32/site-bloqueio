import { ReactNode, useState } from 'react';
import { SalaType, notificationError, notificationSuccess } from '@/utils/functions';
import { CardManager } from '../CardManager';
import { deleteVlan, createVlan } from '@/utils/BDEndpoints';

interface ModalManagerProps {
  setShowModalManager: React.Dispatch<React.SetStateAction<boolean>>;
  salasAgrupadas: Record<string, SalaType[]>;
}

interface VlanLabState {
  vlan: number | null;
  lab: string | null;
}

export function ModalManager({setShowModalManager, salasAgrupadas}: ModalManagerProps) {

  const [deleteVlans, setDeleteVlans] = useState<number[]>([]);
  const [createNewLab, setCreateNewLab] = useState<VlanLabState[]>([]);
  const [newLabData, setNewLabData] = useState<VlanLabState>({ vlan: null, lab: null });
  const [showNewLabForm, setShowNewLabForm] = useState(false);



  const handleNewClass = ({ vlan, lab }: VlanLabState) => {
    setCreateNewLab((prevArray) => [
      ...prevArray,
      { vlan, lab }
    ]);
  };


  async function onConfirm() {
    if (deleteVlans.length > 0) { // se houver vlans a serem excluídas
      try {
        // Iterar sobre cada VLAN em deleteVlans e chamar handleDelete
        for (const vlan of deleteVlans) {
          await deleteVlan(vlan);
        }
        setDeleteVlans([]); // Limpar deleteVlans após a exclusão
        notificationSuccess('Sala(s) excluída(s)!');
      } catch (error) {
        console.error(error);
        setDeleteVlans([]); // Limpar deleteVlans após a exclusão
        // Ou manipule o erro de outra forma, conforme necessário
        notificationError('Falha ao excluir sala(s)!');
      }
    }

    if (createNewLab.length > 0) {
      try {
        // Iterar sobre cada objeto em createNewLab e chamar createVlan
        for (const newItem of createNewLab) {
          const { vlan, lab } = newItem;
          if (vlan && lab){ // cria nova sala se os itens não forem null
            await createVlan(vlan, lab);
          }
        }
        setCreateNewLab([]); // Limpar createNewLab após a criação
        notificationSuccess('VLAN(s) criada(s)!');
      } catch (error) {
        console.error(error);
        setCreateNewLab([]); // Limpar createNewLab após a criação
        // Ou manipule o erro de outra forma, conforme necessário
        notificationError('Falha ao criar VLAN(s)!');
      }
    }
    else{
     setShowModalManager(false)
    }
  }

  function onCancel(){
    setDeleteVlans([]); // Limpar deleteVlans
    setCreateNewLab([]); // Limpar createNewLab 
    setShowModalManager(false)
  }

  const handleNewLabSubmit = () => {
    if (newLabData.vlan !== null && newLabData.lab !== null) {
      handleNewClass(newLabData);
      setNewLabData({ vlan: null, lab: null });
      setShowNewLabForm(false);
    }
  };

  
  return(
    <>
    {/*div principal (tela inteira)*/}
      <div          
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm"
      >
        {/*div modal*/}
        <div className="relative w-auto my-6 mx-auto max-w-full bg-white-200 rounded">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">

            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Gerenciar salas
              </h3>
            </div>

            {/*body*/}
            <div className="relative p-6 flex-auto">
              {Object.entries(salasAgrupadas).map(([bloco, salasDoBloco]) => (
                <div key={bloco} className='flex flex-wrap items-center justify-center'>
                  {salasDoBloco.map((sala) => (
                    <CardManager key={sala.lab} sala={sala.lab} vlan={sala.vlan} deleteVlans={deleteVlans} setDeleteVlans={setDeleteVlans} isNew={false} />
                  ))}
                </div>
              ))}
            </div>

              
              {createNewLab.length > 0 && (// interação para as novas salas
                <div className='flex flex-wrap items-center justify-center mt-4'>
                  {createNewLab.map((newLabItem, index) => (
                    <CardManager key={index} sala={newLabItem.lab || 'Lab não especificado'} vlan={newLabItem.vlan || 0} deleteVlans={deleteVlans} setDeleteVlans={setDeleteVlans} isNew={true} />
                  ))}
                </div>
              )}

            {/*footer*/}
            <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
              
              {!showNewLabForm && (
                <button
                className="bg-yellow-50 text-black-50 text-base font-alt px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowNewLabForm(true)}
                >Nova sala</button>
              )}

              {showNewLabForm && (
                <div >
                  <input
                    className='mx-2 w-24 border border-black-50 rounded p-2'
                    type="number"
                    placeholder="VLAN"
                    value={newLabData.vlan || ''}
                    onChange={(e) => setNewLabData({ ...newLabData, vlan: parseInt(e.target.value) || null })}
                  />
                  <input
                    className='mx-2 w-32 border border-black-50 rounded p-2'
                    type="text"
                    placeholder="Laboratório"
                    value={newLabData.lab || ''}
                    onChange={(e) => setNewLabData({ ...newLabData, lab: e.target.value.toUpperCase() || null })}
                  />
                  <button 
                    className="bg-yellow-50 text-black-50 text-base font-alt px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={handleNewLabSubmit}>Criar Sala</button>
                </div>
              )}

              <div>
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => onCancel() }
                >Cancelar</button>

                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    onConfirm()
                  }}
                >Confirmar</button>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>

  )
}


