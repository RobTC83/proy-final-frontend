import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../context/auth/AuthContext'
import { useHistory } from "react-router-dom";

export default function Header(props) {

  const authContext = useContext(AuthContext)
  const {autenticado, cerrarSesion,totalPresupuestos, totalIngresos} = authContext;

  let history = useHistory()

    useEffect(() => {
      if(!autenticado){
        history.push('/') // REDIRECTS CON REACT-ROUTER-DOM
      }

    }, [])


    const cerrarUsuario = () => {
      cerrarSesion()
      window.location.reload();
    }

    // const diferencia = ()=> {
    //    const dif = totalIngresos-totalPresupuestos
    //    return dif
    // }
    // diferencia()

    // const [signoResultado, setSignoResultado] = useState(null)

    // let setSigno = ()=>{
    //   if (diferencia>0){
    //     setSignoResultado("positivo")
    //   }
    //   if (diferencia=0){
    //     setSignoResultado("cero")
    //   }
    //   else {setSignoResultado("negativo")}
    // }

    // setSigno()
    
    

    return (
  

    <div>
<div>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-8" src="https://res.cloudinary.com/robtc/image/upload/v1615398315/di%CC%81a_cero_3_i3hxsg.png" alt="Workflow"/>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              <a href="/" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Editar perfil</a>

              <button onClick={ () => cerrarUsuario() } class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Cerrar sesión</button>



            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">


            {/* <!-- Profile dropdown --> */}
            <div class="ml-3 relative">
              <div>
                <button type="button" class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" src="https://res.cloudinary.com/robtc/image/upload/v1615416915/PEPE_opekbj.png" alt=""/>
                </button>
              </div>

              

            </div>
          </div>
        </div>
       
      </div>
    </div>

    
  </nav>

  <header class="bg-white shadow">
    <div id="header" class="flex justify-between items-center">
        <div class="max-w-7xl mx-auto py-2 px-4 ">
          <h1 class="text-3xl font-bold text-gray-900">
            Marzo 2021
          </h1>
          {totalIngresos-totalPresupuestos >0 ? 
          <p className="text-c-black">Te falta presupuestar $ {totalIngresos-totalPresupuestos}</p>:
          <p></p>}

          {totalIngresos-totalPresupuestos <0 ? 
          <p className="text-c-red">Has presupuestado $ {totalIngresos-totalPresupuestos} de más</p> : 
          <p></p>}
          
          {!(totalIngresos-totalPresupuestos)  ?
          <p className="text-c-green">¡Bienvenido, agrega tus ingresos!</p> : <p></p>}
          { totalIngresos-totalPresupuestos===0 ?
          <p className="text-c-green">¡Felicidades, ahora cada peso tiene un destino claro!</p>: <p></p>}

        </div>

       
    </div>
                        
  </header>



</div>

    </div>
    
    )
}
