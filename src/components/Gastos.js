import React,{useState,useContext,useEffect} from 'react'

import AuthContext from '../context/auth/AuthContext'



  


export default function Gastos() {

    const {presupuestosUsuario,crearGasto, gastosUsuario, borrarGasto, mostrarGastosUsuario,calcularTotalGastos} = useContext(AuthContext)

     useEffect(() => {
         mostrarGastosUsuario()
     }, [gastosUsuario])

    const [thirdButton, setThirdButton] = useState(false)

    const estatusTercerBoton = () => {
        if(thirdButton === false) {
            setThirdButton(true)
        }
    }

  // State inicial de los campos del formulario
  
 const [expenseItem, setExpenseItem] = useState({
    expenseAmount: null,
    expenseConcept: null,
    expenseDate: null,
    relatedBudget: null
 })

 // Desestructurar la info del formulario 
const {expenseAmount, expenseConcept, expenseDate, relatedBudget} = expenseItem
    
const onChange = e => {

    setExpenseItem({
      ...expenseItem,
      [e.target.name]: e.target.value
    })
  }
// Cuando se llenen los campos

const onSubmit = e => {
    e.preventDefault()

 //validar que no haya campos vacíos
 if(
    expenseAmount === "" ||
    expenseConcept === "" || 
    expenseDate === "" ||
    relatedBudget === ""
    
    ){
      console.log("Todos los campos son obligatorios")
      return
  }

  // pasarlo al action de la función
  crearGasto({
    expenseAmount,
    expenseConcept,
    expenseDate,
    relatedBudget
  })

  setExpenseItem(
    {
     expenseAmount: "",
     expenseConcept: "",
     expenseDate: "",
     relatedBudget:""
    })


 setThirdButton(false)
 calcularTotalGastos()
    }

        // Eliminar gasto

    const eliminarGasto = (el)=>{
        borrarGasto(el)
    }

    return (
        <div class="space-y-3 px-4 py-1 max-w-4xl">
                        <div class="flex justify-end mb-2 mt-2">
                            <p className= "text-c-red hover:text-c-yellow focus:outline-none" onClick={()=>estatusTercerBoton()}>Agregar gasto</p>    
                        </div>
            
                    <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">

                        <div class="px-4 py-3 text-gray-900 font-bold bg-c-yellow hover:bg-c-peach">
                            {/* <span >Has gastado: </span><span className="text-c-red bg-white font-bold">$ {totalGastos}</span> */}
                            
                            {/* <p>Aún tienes presupuestados <span className="text-c-green bg-white font-bold">${totalPresupuestos-totalGastos}</span></p> */}
                        </div>
                            
                        <div>
                            {!thirdButton ? <p></p> : 
                                    <form onSubmit={onSubmit} className="space-y-1">
                                        <label className="">  $   </label>
                                        <input  onChange={onChange} className="h-8 w-8/12" name="expenseAmount" 
                                        value={expenseAmount} 
                                        type="number" min="0" placeholder="Monto"/><br/>
                                        <input  onChange={onChange} name="expenseConcept" value={expenseConcept}type="text" className="h-8 w-9/12" placeholder="¿Dónde gastaste?"/>
                                        <input  onChange={onChange} name="expenseDate" value={expenseDate}type="date" className="h-8 w-9/12"/>
                                        
                                        <select name="relatedBudget"
                                        onChange={onChange} value={relatedBudget} 
                                        className="h-9 w-9/12 pl-7 pr-12 sm:text-sm  border border-gray-600" placeholder="Selecciona">
                                            {
                                            presupuestosUsuario.map((e,i)=>{
                                                return <option key={i} value={e.budgetConcept}>{e.budgetConcept}</option>
                                            })}
                                         </select>
                                        
                                    

                                         <div className="flex justify-start mx-8 py-2 ">
                                                <button type="submit" className="border-gray-700 bg-gray-300 text-gray-700 h-8 w-9/12">Registrar gasto</button>
                                        </div>
                                    </form>
                            }   

                            { thirdButton ? <p></p> :
                            <div class= "space-y-0">
                                <div class="px-4 py-2">
                                
                              

                                {!gastosUsuario ? (<p>Loading</p>) :

                                    gastosUsuario.map((elem)=>{
                                    return(
                                    <div className="px-2 py-1 flex justify-between">
                                        <div>
                                            <span>{elem.expenseConcept}</span> <span className="text-c-blue font-bold">{`$ ${elem.expenseAmount}`}</span> 
                                        </div>
                                        <button onClick={()=>eliminarGasto(elem._id)}>Eliminar</button>
                                    </div>  )
                                    })  
                                    }
                                  
                                
                                   
                                    
                                     
                                    
                                    

                                  
                                  
                                    
                                  
                                
                               
                                </div>

                                
                            </div>}
                        </div>
                    </div>
        </div> 

        
    )
}
