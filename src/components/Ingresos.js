import React, {useContext, useState, useEffect} from 'react'

import AuthContext from '../context/auth/AuthContext'

export default function Ingresos(props) {

  const {mostrarIngresos,totalIngresos} = useContext(AuthContext)

  useEffect(()=>{
      mostrarIngresos()
  },[])

 const [buttonState, setButtonState] = useState(false)
 
 const estatusBoton = ()=> {
  if(buttonState === false) {
      setButtonState(true)
  }
}

 const [incomeItem, setIncomeItem] = useState({
    incomeAmount: null,
    incomeSource: null,
    incomeDate: null
})

const {incomeAmount, incomeSource, incomeDate} = incomeItem


  
  const onChange = e => {
    console.log(incomeItem)

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

    // registrarIngresos({
    //   incomeAmount,
    //   incomeSource,
    //   incomeDate
    // })

    setButtonState(false)

  }
    return (
        <div>
            
  
                    <div id="Contenedor ingresos" class="space-y-3 px-4 py-1 max-w-4xl">
                    <div class="flex justify-end mb-2 mt-2">

                        <p className= "text-c-green hover:text-c-yellow focus:outline-none" onClick={()=>estatusBoton()}>Agregar ingreso</p>
                        </div>
                        <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                            
                        

                            <div class="px-4 py-3 font-bold text-gray-900 bg-c-yellow hover:bg-c-peach">
                                    <p>Tus ingresos<span className="text-c-yellow hover:text-c-peach">___________________</span><span className="text-c-green bg-white font-bold">Total: ${totalIngresos}</span></p>
                                    
                            </div>
                            {!buttonState ? <p></p> : 
            
                <form onSubmit={onSubmit} className="space-y-1">
                    <label className="">  $   </label>
                    <input onChange={onChange} value={incomeAmount} className="h-8 w-8/12" name="incomeAmount" type="number" min="0" /><br/>
                    <input onChange={onChange} value={incomeSource} name="incomeSource" className="h-8 w-9/12 pl-7 pr-12 sm:text-sm  border border-gray-600" placeholder="Concepto: sueldo,ventas, etc"/><br/>
                    <input onChange={onChange} value={incomeDate} name="incomeDate" type="date" className="h-8 w-9/12"/>
                    <div className="flex justify-start mx-8 py-2 ">
                        <button /*onClick={registrarIngresos} */type="submit" className="border-gray-700 bg-gray-300 text-gray-700 h-8 w-9/12">Registra tu ingreso</button>
                    </div>
                </form>
    }
                    { buttonState ? <p></p> :
                            <div class= "space-y-0">
                                <div class="px-4 py-2">
                                <p>Sueldo quincenal<span className="text-white">_______________________</span><span className="text-c-green font-bold">$ 5,500</span></p>
                                </div>
                                <div class="px-4 py-2 ">
                                <p>Comisiones por ventas<span className="text-white">____________________</span><span className="text-c-green font-bold">$ 930</span></p>
                                </div>
                            </div>}

                        </div>
                        
                        

                        

                    </div>

                    
            <div/>

            
    </div>

            


        
    )
}
