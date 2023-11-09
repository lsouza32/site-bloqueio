"use client"
import { useRouter } from 'next/navigation';
import nookies, { destroyCookie } from 'nookies';
import { useState, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';

import { Card } from '@/components/Card'
import { Header } from '@/components/Header'



export default function LabManager () {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  function handleSingOut(){
    // Remova o cookie do token
    destroyCookie(null, 'nextauth.token');
    router.push('/login');
  }


  useEffect(() => {
    const cookies = nookies.get();
    const token = cookies['nextauth.token'];

    if (!token) {
      router.push('/login'); // Redirecionar para a página de login se o token não estiver presente
      console.log('token nao esta presente: '+ token)
    } else {
      // Verificar a autenticidade do token no backend
      fetch('http://localhost:3001/verify-token', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Token inválido');
          }
          setIsAuthorized(true); // Autorizar o acesso se o token for válido
        })
        .catch(() => {
          router.push('/login'); // Redirecionar para a página de login se ocorrer algum erro
        });
    }
  }, []);

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

          {/* Botão de logout no canto superior direito */}
          <button className="bg-yellow-50 text-black-50 text-base px-4 py-2 rounded font-alt min-w-[140px] min-h-[44px] hover:bg-yellow-300 "
          onClick={handleSingOut}>Logout</button>
        </div>
      </Header>
      
      {/*body Cards*/}
      <div className=' block  min-w=[300px] min-h-[200px] items-center justify-center'>

      <div className='flex flex-wrap items-center justify-center'>
          {/*Bloco N */}        
          <Card sala='N007' vlan={4}/>
          <Card sala='N101' vlan={34}/>
          <Card sala='N103' vlan={33}/>
          <Card sala='N105' vlan={32}/>

        </div>    

        <div className='flex flex-wrap items-center justify-center'>
          {/*Bloco M */}        
          <Card sala='M006' vlan={9}/>
          <Card sala='M009' vlan={10}/>
          <Card sala='M010' vlan={5}/>
          <Card sala='M012' vlan={59}/>
        </div>  

        <div className='flex flex-wrap items-center justify-center'>
          {/*Bloco C */}        
          <Card sala='C003' vlan={3}/>
        </div>       

      </div>

    </main>
    </>
  )
};

