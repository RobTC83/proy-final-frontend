import React  from 'react'
import Ingresos from '../components/Ingresos'

import Graficas from '../components/Graficas'
import Gastos from '../components/Gastos'
import Presupuestos from '../components/Presupuestos'
import EditarPerfil from '../rutas/EditarPerfil'


export default function Tablero() {

    return (

    <>
    <div className="marco-completo">
        
        <EditarPerfil/>
          

        <div className="division-tablero">
              <div className="columna-tablero">
                <div className="filas">
                  <Ingresos/>
                  <Presupuestos/>
                </div>
              </div>
              <div className="columna-tablero">
                  <div className="filas">
                      <Gastos/>
                      <Graficas/>
                  </div>
              </div>
        </div>
      </div>

      </>
    )
}
