import React,{useState} from 'react'





export default function Gastos() {


    const [thirdButton, setThirdButton] = useState(false)

    const estatusTercerBoton = () => {
        if(thirdButton === false) {
            setThirdButton(true)
        }
    }

  

    
    const registrarGasto = ()=>{
        setThirdButton(false)
    }
    




    return (
        <div class="space-y-3 px-4 py-1 max-w-4xl">
                        <div class="flex justify-end mb-2 mt-2">
                            <p className= "text-gray-900 hover:text-c-peach focus:outline-none" onClick={()=>estatusTercerBoton()}>Agregar gasto</p>    
                        </div>
            
                     <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                        <div class="px-4 py-3 text-gray-900 font-bold bg-c-yellow hover:bg-c-peach">
                                    Gastos  [Total: $ 3,430]
                            </div>

                            {!thirdButton ? <p></p> : 
                                    <form  className="space-y-1">
                                        <label className="">  $   </label>
                                        <input  className="h-8 w-8/12" name="expenseAmount" type="number" min="0" /><br/>
                                        <input  name="expenseConcept" className="h-8 w-9/12 pl-7 pr-12 sm:text-sm  border border-gray-600" placeholder="Concepto a presupuestar"/><br/>
                                        <input  name="expenseDate" type="date" className="h-8 w-9/12"/>

                                        <div className="flex justify-start mx-8 py-2 ">
                                            <button onClick={registrarGasto} type="submit" className="border-gray-700 bg-gray-300 text-gray-700 h-8 w-9/12">Registrar gasto</button>
                                        </div>
                                    </form>
                        }
                            {thirdButton ? <p></p> :
                            <div class= "space-y-0">
                                <div class="px-4 py-2">
                                    Renta          [$ 8,800]
                                </div>
                                <div class="px-4 py-2 ">
                                    Despensa       [$ 700]
                                </div>
                                <div class="px-4 py-2 ">
                                    Transporte     [$ 250]
                                </div>
                                <div class="px-4 py-2 ">
                                    Ahorro         [$ 100]
                                </div>
                            </div>}

                        </div>
        </div>
    )
}
