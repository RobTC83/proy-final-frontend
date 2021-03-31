import React, {useEffect, useContext} from 'react'
import AuthContext from '../context/auth/AuthContext'

export default function MostrarIngresos() {

    const {mostrarIngresos,totalIngresos,usuario} = useContext(AuthContext)

    useEffect(()=>{
        mostrarIngresos()
    },[])

    // console.log("este es el usuario",usuario.incomeInfo[3].incomeSource)
    return (
        <div>
        {totalIngresos}
        {!usuario.incomeInfo ? (<p>Loading</p>) :

            usuario.incomeInfo.map((elem,i)=>{
                return(<p>{`${elem.incomeSource} ${elem.incomeAmount}`} </p>)
            
            })  
 }
</div>
)
}
