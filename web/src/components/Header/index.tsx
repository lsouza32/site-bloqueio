import { ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <>     
      <div className="bg-gray-50 py-8 px-10 flex justify-between items-center">
        {/* Imagem no canto superior esquerdo - logo UTFPR */}
        <img        
          src="/cogeti-ap.png"
          alt="Logo"
          width={400}     
          placeholder="logo-cogeti-ap"
        />

        {children}
      </div>      

      <div className="bg-gray-100 py-4 px-10 mb-12">
        {/*Linhazinha escuro*/}
      </div>    

    </>
  );
}
