"use client"
import { useRouter } from 'next/navigation';
import nookies, { destroyCookie } from 'nookies';
import { useState, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { Card } from '@/components/Card'
import { Header } from '@/components/Header'
import { SalaType, agruparSalasPorBloco } from '@/utils/functions'
import { fetchSalas } from '@/utils/api';
import { ModalManager } from '@/components/ModalManager';


export default function LabManager () {

  const router = useRouter();
  const [salas, setSalas] = useState<SalaType[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModalManager, setShowModalManager] = useState(false);


  const salasAgrupadas = agruparSalasPorBloco(salas);

  function handleSignOut(){
    // Remova o cookie do token
    destroyCookie(null, 'nextauth.token');
    router.push('/login');
  }

  function handleManager(){
    setShowModalManager(true)
  }

  useEffect(() => {
    const cookies = nookies.get();
    const token = cookies['nextauth.token'];

    if (!token) {
      router.push('/login'); // Redirecionar para a página de login se o token não estiver presente
    } else {
      // Verificar a autenticidade do token no backend
      fetch('http://localhost:3001/api/authentication/verify-token', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async(response) => {
          if (!response.ok) {
            throw new Error('Token inválido');
          }
          const { userAdmin } = await response.json();
          setIsAuthorized(true); // Autorizar o acesso se o token for válido
          setIsAdmin(userAdmin);
        })
        .catch(() => {
          router.push('/login'); // Redirecionar para a página de login se ocorrer algum erro
        });
    }
  }, []);

    // useEffect para buscar as salas 
    useEffect(() => {
      fetchSalas(setSalas);
    }, [salas]); // Executar uma vez no carregamento do componente


  if (!isAuthorized) {
    return null; // Pode exibir uma mensagem de carregamento aqui
  }

  return (    
    <>        
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
      />
    <main className="grid min-h-screen">
            
      <Header>
        <div className='flex flex-row items-center justify-between mr-2'> {/*Div user e button*/}

          {/* Ícone de usuário e texto "Bem-vindo ..." */}             
          <div className=" flex flex-col items-center px-20">        
            <UserCircleIcon className="h-10 w-10 text-black-50" />
            <span className="mt-2 font-alt">Bem-vindo</span>
          </div>

          {isAdmin &&
            <button 
              className="bg-yellow-50 text-black-50 text-base px-4 py-2 mx-2 rounded font-alt min-w-[140px] min-h-[44px] hover:bg-yellow-300 "
              onClick={handleManager}
                >Gerenciar salas
            </button>
          }

          {showModalManager &&
            <ModalManager setShowModalManager={setShowModalManager} salasAgrupadas= {salasAgrupadas}/>
          }

          {/* Botão de logout no canto superior direito */}
          <button 
            className="bg-yellow-50 text-black-50 text-base px-4 py-2 rounded font-alt min-w-[140px] min-h-[44px] hover:bg-yellow-300 "
            onClick={handleSignOut}>
              Logout
          </button>
        </div>
      </Header>
      
      {/*body Cards*/}
      <div className=' block  min-w=[300px] min-h-[200px] items-center justify-center'>

        {Object.entries(salasAgrupadas).map(([bloco, salasDoBloco]) => (
          <div key={bloco} className='flex flex-wrap items-center justify-center'>
            {salasDoBloco.map((sala) => (
              <Card key={sala.lab} sala={sala.lab} vlan={sala.vlan} salaBlocked={sala.isBlocked} />
            ))}
          </div>
        ))}

      </div>

    </main>
    </>
  )
};