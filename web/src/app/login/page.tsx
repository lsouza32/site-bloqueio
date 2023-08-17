"use client"


import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { setCookie } from 'nookies';

import { Header } from "@/components/Header";


type SignInData ={
  user: string;
  password: string;
}


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {register, handleSubmit} = useForm<SignInData>();

  const router = useRouter();


  async function signIn({ user, password }: SignInData) {
    try {
      const response = await fetch('http://localhost:3001/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setCookie(undefined, 'nextauth.token', data.token , {
          maxAge: 60 * 60 * 1, // expira em 1hr
          path: '/'
        })
        // Autenticação bem-sucedida, redirecione para a próxima página
        router.push('/labManager');
      }
      else if(response.status=== 402){
        toast.error('Senha ou usuário inválido');
      }
      else if(response.status=== 403){
        toast.error('Usuário sem permissão. Entre em contato com a COGETI');
      }
    } catch (error) {
      toast.error('Authentication failed');
      console.error('Error:', error);
    }
  }
  
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };


  return (
    
    <main className="h-screen">
      <Header/>
      <div className="flex items-center justify-center p-40">
        <form
          className="w-full max-w-md bg-white-100 rounded-lg px-8 pt-6 pb-8 shadow-lg "
          onSubmit={handleSubmit(signIn)}
        >
          <div className="mb-4">
            <label
              className="block text-black-50 text-base font-alt mb-2"
              htmlFor="user"
            >
              Usuário
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 font-alt text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register('user')}
              id="user"
              name="user"
              type="user"
              required
              placeholder="User"
            />
          </div>

          <div className="mb-4 relative">
            <label
              className="block text-black-50 text-base font-alt mb-2"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 font-alt text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...register('password')}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Senha"
              
            />
            <span
              className="absolute right-0 top-0 mt-10 mr-4 cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5 text-black-50" /> : <EyeIcon className="h-5 w-5 text-black-50" />}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              className="bg-black-50 hover:bg-gray-700 text-yellow-50 font-alt mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </main>
    
  );
};
