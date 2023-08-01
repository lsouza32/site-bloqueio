"use client"

import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { Header } from "@/components/Header";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode adicionar lógica para autenticar o usuário.
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <main className="h-screen">
      <Header/>
      <div className="flex items-center justify-center p-40">
        <form
          className="w-full max-w-md bg-white-100 rounded-lg px-8 pt-6 pb-8 shadow-lg "
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-black-50 text-base font-alt mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 font-alt text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="email@professores.utfpr.edu.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
    </main>
  );
};
