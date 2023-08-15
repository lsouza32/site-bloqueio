"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Index() {
  const router = useRouter();  // Redirecionar para a página de login quando a página for carregada
  useEffect(() => {
    router.push('/login');
  }, []);

  return null; // Renderização vazia, já que o redirecionamento ocorre via useEffect
};


