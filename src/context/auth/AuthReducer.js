/* eslint-disable import/no-anonymous-default-export */

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    OBTENER_INGRESOS,
    OBTENER_PRESUPUESTOS,
    CREAR_INGRESO,
    CREAR_PRESUPUESTO,
    MOSTRAR_INGRESOS_USUARIO,
    BORRAR_INGRESO

} from '../../types/index'

export default (state, action) => {

    switch(action.type){

        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload.token)
            
            return{
                ...state,
                autenticado: true,
                mensaje: null
            }
        
        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token')

            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: action.payload,
                cargando: false
            }
        
            case OBTENER_USUARIO:
                return {
                    ...state,
                    autenticado: true,
                    usuario: action.payload
                }
            case OBTENER_INGRESOS:
                return {
                    ...state,
                    totalIngresos: action.payload 
                }
            
            case OBTENER_PRESUPUESTOS:
                return {
                    ...state,
                    totalPresupuestos: action.payload
                }
            
            case CREAR_INGRESO:
                return {
                    ...state,
                    usuario: action.payload
                }
            
            case CREAR_PRESUPUESTO:
                return {
                    ...state,
                    usuario: action.payload
                }

            case MOSTRAR_INGRESOS_USUARIO:
                return {
                    ...state,
                    ingresosUsuario: action.payload
                }
            
             case BORRAR_INGRESO:
                return {
                    ingresosUsuario: action.payload 
                 }
            default:
                return state
    }
}