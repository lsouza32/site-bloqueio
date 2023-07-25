import { Card } from '@/components/Card'
import { UserCircleIcon } from '@heroicons/react/24/solid'

export default function Home() {
  return (
    <main className="grid min-h-screen">
      
      <header>
        <div className="bg-gray-50 py-8 px-10 flex justify-between items-center">
          {/* Imagem no canto superior esquerdo - logo UTFPR */}
          <img        
            src="/cogeti-ap.png"
            alt="Logo"
            width={400}            
          />

          <div className='flex flex-row items-center justify-between mr-2'> {/*Div user e button*/}

            {/* Ícone de usuário e texto "Bem-vindo ..." */}             
            <div className=" flex flex-col items-center px-20">        
              <UserCircleIcon className="h-10 w-10 text-blue-50" />
              <span className="mt-2">Bem-vindo...</span>
            </div>

            {/* Botão de logout no canto superior direito */}
            <button className="bg-yellow-50 text-black-50 text-base px-4 py-2 rounded font-bold min-w-[140px] min-h-[44px] hover:bg-yellow-300 ">Logout</button>

          </div>

        </div>

        <div className="bg-gray-100 py-4 px-10 mb-12">
          {/*Linha zinha escuro*/}
        </div>      
      </header>


      {/*body Cards*/}
      <div className=' block  min-w=[300px] min-h-[200px] items-center justify-center'>

      <div className='flex flex-wrap items-center justify-center'>
          {/*Bloco N */}        
          <Card sala='N007'/>
          <Card sala='N101'/>
          <Card sala='N103'/>
          <Card sala='N105'/>     

        </div>    

        <div className='flex flex-wrap items-center justify-center'>
          {/*Bloco M */}        
          <Card sala='M005'/>
          <Card sala='M006'/>
          <Card sala='M009'/>
          <Card sala='M012'/>
        </div>  

        <div className='flex flex-wrap items-center justify-center'>
          {/*Bloco C */}        
          <Card sala='C003'/>
        </div>       

      </div>

    </main>
  )
}
