import React, {useEffect, useContext} from 'react'
import AuthContext from '../context/auth/AuthContext'

export default function MostrarIngresos() {

    const {mostrarIngresos,totalIngresos} = useContext(AuthContext)

    useEffect(()=>{
        mostrarIngresos()
    },[])

    return (
        <div>
        {totalIngresos}
            
        </div>
    )
}
