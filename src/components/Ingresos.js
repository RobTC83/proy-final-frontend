import React, {useContext, useState, useEffect} from 'react'

import AuthContext from '../context/auth/AuthContext'

export default function Ingresos(props) {

  const {mostrarIngresos,totalIngresos,usuario,crearIngreso,ingresosUsuario,mostrarIngresosUsuario,borrarIngreso} = useContext(AuthContext)

  useEffect(()=>{
      mostrarIngresos()
      mostrarIngresosUsuario()
      
  },[usuario,ingresosUsuario])

 const [buttonState, setButtonState] = useState(false)
 
 const estatusBoton = ()=> {
  if(buttonState === false) {
      setButtonState(true)
  }
}

// State inicial de los campos del formulario

 const [incomeItem, setIncomeItem] = useState({
    incomeAmount: null,
    incomeSource: null,
    incomeDate: null
})

// Desestructurar la info del formulario 
const {incomeAmount, incomeSource, incomeDate} = incomeItem
  
  const onChange = e => {

    setIncomeItem({
      ...incomeItem,
      [e.target.name]: e.target.value
    })
  }

  // Cuando se llenen los campos

  const onSubmit = e => {
    e.preventDefault()

    //validar que no haya campos vacíos
    if(
      incomeAmount === "" ||
      incomeSource === "" || 
      incomeDate === ""
      
      ){

        console.log("Todos los campos son obligatorios")
        return
    }

    // pasarlo al action de la función
     crearIngreso({
       incomeAmount,
       incomeSource,
       incomeDate
     })

     setIncomeItem(
       {
        incomeAmount: "",
        incomeSource: "",
        incomeDate: ""
       }
     )
    setButtonState(false)

   
  
  }
   //Eliminar ingreso

   const eliminarIngreso = (el)=>{
    borrarIngreso(el) 
    console.log(el)

  }
    return (
        <div>
            
  
                    <div id="Contenedor ingresos" class="space-y-3 px-4 py-1 max-w-4xl">
                    <div class="flex justify-end mb-2 mt-2">

                        <p className= "text-c-green hover:text-c-yellow focus:outline-none" onClick={()=>estatusBoton()}>Agregar ingreso</p>
                        </div>
                        <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                            
                        

                            <div class="px-4 py-3 font-bold text-gray-900 bg-c-yellow hover:bg-c-peach">
                                  <div className="flex justify-between">
                                    <p className="text-black ">Tus ingresos</p>
                                    <span className="text-c-green bg-white font-bold">Total: ${totalIngresos}</span>
                                  </div> 
                            </div>
                            {!buttonState ? <p></p> : 
            
                <form onSubmit={onSubmit} className="space-y-1">
                    <label className="">  $   </label>
                    <input onChange={onChange} value={incomeAmount} className="h-8 w-8/12" name="incomeAmount" type="number" min="0" placeholder="Monto" /><br/>
                    <input onChange={onChange} value={incomeSource} name="incomeSource" className="h-8 w-9/12 pl-7 pr-12 sm:text-sm  border border-gray-600" placeholder="Concepto: sueldo,ventas, etc"/><br/>
                    <input onChange={onChange} value={incomeDate} name="incomeDate" type="date" className="h-8 w-9/12"/>
                    <div className="flex justify-start mx-8 py-2 ">
                        <button type="submit" className="border-gray-700 bg-gray-300 text-gray-700 h-8 w-9/12">Registra tu ingreso</button>
                    </div>
                </form>
    }
                    { buttonState ? <p></p> :
                            <div class= "space-y-0">
                                <div class="px-4 py-2">
                                {!ingresosUsuario ? (<p>Loading</p>) :

                                ingresosUsuario.map((elem,i)=>{
                                return(
                                  <>
                                    <div className="px-2 py-1 flex justify-between">
                                      <span>{elem.incomeSource}</span> <span className="text-c-green font-bold">{`$ ${elem.incomeAmount}`}</span>
                                    </div>
                                  <button onClick={()=>eliminarIngreso(elem._id)}>Eliminar</button>
                                  </>
                                    )
                                  })  
                                }
                               
                                </div>

                                
                            </div>}

                        </div>
                        
                        

                        

                    </div>

                    
            <div/>

            
    </div>

            


        
    )
}
