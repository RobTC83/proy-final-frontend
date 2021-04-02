import React,{useState, useContext, useEffect} from 'react'

import AuthContext from '../context/auth/AuthContext'

export default function Presupuestos(props) {

    const {mostrarPresupuestos, totalPresupuestos, usuario} = useContext(AuthContext)

    useEffect(()=>{
        mostrarPresupuestos()
    },[])

    const [secondButtonState, setSecondButtonState] = useState(false)





const estatusSegundoBoton = ()=> {
    if(secondButtonState === false){
        setSecondButtonState(true)
    }

}


const registrarPresupuesto = ()=> {
    setSecondButtonState(false)
}






    return (
        <div class="space-y-3 px-4 py-1 max-w-4xl">
            
            <div class="flex justify-end mb-2 mt-2">
                <p className= "text-c-blue hover:text-c-yellow focus:outline-none" onClick={()=>estatusSegundoBoton()}>Agregar presupuesto</p>    
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                        <div class="px-4 py-3 text-gray-900 font-bold bg-c-yellow hover:bg-c-peach">
                            <div className="flex justify-between">
                                <p>Tus Presupuestos</p> 
                                <span className="text-c-blue bg-white font-bold">Total: ${totalPresupuestos}</span>
                            </div>
                        </div>

                            {!secondButtonState ? <p></p> : 
                                    <form  className="space-y-1">
                                        <label className="">  $   </label>
                                        <input  className="h-8 w-8/12" name="budgetAmount" type="number" min="0" /><br/>
                                        <input  name="budgetConcept" className="h-8 w-9/12 pl-7 pr-12 sm:text-sm  border border-gray-600" placeholder="Concepto a presupuestar"/><br/>
                                        <div className="flex justify-start mx-8 py-2 ">
                                            <button onClick={registrarPresupuesto} type="submit" className="border-gray-700 bg-gray-300 text-gray-700 h-8 w-9/12">Registrar presupuesto</button>
                                        </div>
                                    </form>
                        }
                            {secondButtonState ? <p></p> :
                                <div class= "space-y-0">
                                <div class="px-4 py-2">
                                {!usuario.budgetInfo ? (<p>Loading</p>) :

                                usuario.budgetInfo.map((elem,i)=>{
                                return(
                                  <div className="px-2 py-1 flex justify-between">
                                    <span>{elem.budgetConcept}</span> <span className="text-c-blue font-bold">{`$ ${elem.budgetAmount}`}</span> 
                                  </div>  )
                                  })  
                                }
                               
                                </div>

                                
                            </div>}

                        </div>

        </div>
    )
}
