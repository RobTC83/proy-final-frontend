import React,{useState} from 'react'

export default function Presupuestos() {


    const [secondButtonState, setSecondButtonState] = useState(false)


const [budgetItem, setBudgetItem] = useState({
    budgetAmount: null,
    budgetConcept: null
})


const estatusSegundoBoton = ()=> {
    if(secondButtonState == false){
        setSecondButtonState(true)
    }

}


const registrarPresupuesto = ()=> {
    setSecondButtonState(false)
}

const {budgetAmount, budgetConcept} = budgetItem





    return (
        <div class="space-y-3 px-4 py-1 max-w-4xl">
            
            <div class="flex justify-end mb-2 mt-2">
                <p className= "text-gray-900 hover:text-c-peach focus:outline-none" onClick={()=>estatusSegundoBoton()}>Agregar presupuesto</p>    
            </div>

            <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                        <div class="px-4 py-3 text-gray-900 font-bold bg-c-yellow hover:bg-c-peach">
                                    Presupuestos  [Total: $ 6,430]
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
                                    Renta          [$ 3,800]
                                </div>
                                <div class="px-4 py-2 ">
                                    Despensa       [$ 1,500]
                                </div>
                                <div class="px-4 py-2 ">
                                    Transporte     [$ 750]
                                </div>
                                <div class="px-4 py-2 ">
                                    Ahorro         [$ 380]
                                </div>
                            </div>}

                        </div>

        </div>
    )
}
