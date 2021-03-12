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
                            <p className= "text-c-red hover:text-c-yellow focus:outline-none" onClick={()=>estatusTercerBoton()}>Agregar gasto</p>    
                        </div>
            
                     <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                        <div class="px-4 py-3 text-gray-900 font-bold bg-c-yellow hover:bg-c-peach">
                        <p>Tus gastos<span className="text-c-yellow bg-c-yellow">_________</span><span className="text-c-red bg-white font-bold">$ 3,430</span><span className="text-white bg-white">___</span><span className="bg-white">tienes</span><span className="text-white bg-white">___</span><span className="text-c-green bg-white font-bold">$ 3,000</span></p>
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
                                <p>Renta<span className="text-white">_______________</span><span className="text-c-red font-bold">$ 2,380</span><span className="text-white">___</span><span>tienes</span><span className="text-white">___</span><span className="text-c-green font-bold">$ 1,420</span></p>
                                </div>
                                <div class="px-4 py-2 ">
                                <p>Despensa<span className="text-white">_____________</span><span className="text-c-red font-bold">$ 700</span><span className="text-white">___</span><span>tienes</span><span className="text-white">_____</span><span className="text-c-green font-bold">$ 800</span></p>
                                </div>
                                <div class="px-4 py-2 ">
                                <p>Transporte<span className="text-white">____________</span><span className="text-c-red font-bold">$ 250</span><span className="text-white">____</span><span>tienes</span><span className="text-white">_____</span><span className="text-c-green font-bold">$ 500</span></p>
                                </div>
                                <div class="px-4 py-2 ">
                                <p>Ahorro<span className="text-white">_________________</span><span className="text-c-red font-bold">$ 100</span><span className="text-white">____</span><span>tienes</span><span className="text-white">____</span><span className="text-c-green font-bold">$ 280</span></p>
                                </div>
                            </div>}

                        </div>
        </div>
    )
}
