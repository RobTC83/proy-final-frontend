import React, {useReducer} from 'react'

import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'

import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token'

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


const AuthState = props => {

    //Datos iniciales para empezar el estado global
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: [], // info del usuario
        totalIngresos: null,
        totalPresupuestos: null,
        totalGastos:null,
        ingresosUsuario:null
    }

    const [state, dispatch] = useReducer(AuthReducer,initialState)

    // Registra un usuario

    const registrarUsuario = async (datos) => {
        try{
            const respuesta = await clienteAxios.post('/usuarios',datos)

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })

            // Obtener el usuario
            usuarioAutenticado()

        } catch(error){
            dispatch({
                type: REGISTRO_ERROR,
            })
        }
    }

    // Retorna el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = await localStorage.getItem('token') // LEER EL TOKEN DE LOCAL STORAGE
        
        if(token) {
            // Función para enviar el token por headers
            await tokenAuth(token)
        }

        try {                       
            const respuesta = await clienteAxios.get('/auth')

            console.log("Respuesta:", respuesta)

            // YA TENGO LOS DATOS, AHORA QUÉ? 
            // TOCA MODIFICAR EL ESTADO GLOBAL
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario // PAYLOAD = ARGUMENTO ---> action.payload
            })

        } catch(error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // Cuando el usuario inicia sesión
    const iniciarSesion = async datos => {
        try{
            const respuesta = await clienteAxios.post('/auth', datos)

            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })

            usuarioAutenticado()

        } catch(error){
            console.log(error)
            // const alerta = {
            //     msg: error.response.data.msg,
            //     categoria:'alerta-error'
            //}
            dispatch({
                type: LOGIN_ERROR
                // payload: alerta
            })
        }
    }

    // Cierra la sesión del usuario
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    // Traer el total de los ingresos del usuario

    const mostrarIngresos = async() => {
        const resp = await clienteAxios.get('/ingresos/total')
        console.log("sumaIngresos", resp.data)
        dispatch({
            type: OBTENER_INGRESOS,
            payload: resp.data.sumaIngresos
        })
        
    }

    // Traer cada uno de los ingresos del usuario

    const mostrarIngresosUsuario = async() => {
        const resp = await clienteAxios.get('/ingresos')
        console.log("ingresosUsuario",resp.data)
         dispatch({
             type: MOSTRAR_INGRESOS_USUARIO,
             payload: resp.data.ingresos
         })
    }

    // Traer el total de los presupuestos del usuario

    const mostrarPresupuestos = async() => {
        const resp = await clienteAxios.get('/presupuestos/total')
        dispatch({
            type: OBTENER_PRESUPUESTOS,
            payload:resp.data.sumaPresupuestos
        })
        
    }

    // Mostrar el total de gastos del usuario

    const mostrarGastos = async() => {
        const resp = await clienteAxios.get('/')
    }

    // Crear un nuevo ingreso

    const crearIngreso = async(ingreso) => {
        const resp = await clienteAxios.post('/ingresos',ingreso)

         dispatch({
            type: CREAR_INGRESO,
            payload: resp.data

         })
    }


    // Eliminar un ingreso

        const borrarIngreso = async(ing) => {
            const res = await clienteAxios.delete(`/ingresos/${ing}`)
            console.log("eliminarIngreso",res)
            dispatch({
                type: BORRAR_INGRESO,
                payload: state.ingresosUsuario
            })
        }

    // Crear un nuevo presupuesto

    const crearPresupuesto = async(presupuesto) => {
        const resp = await clienteAxios.post('/presupuestos', presupuesto)

        dispatch({
            type:CREAR_PRESUPUESTO,
            payload: resp.data
        })
    }

    return (
        <AuthContext.Provider value={{
            token: state.token,
            autenticado: state.autenticado,
            usuario: state.usuario,
            totalIngresos: state.totalIngresos,
            totalPresupuestos: state.totalPresupuestos,
            totalGastos:state.totalGastos,
            ingresosUsuario: state.ingresosUsuario,
            registrarUsuario,
            iniciarSesion,
            usuarioAutenticado,
            cerrarSesion,
            mostrarIngresos,
            mostrarPresupuestos,
            mostrarGastos,
            crearIngreso,
            crearPresupuesto,
            mostrarIngresosUsuario,
            borrarIngreso

        }}>
            {props.children}
            </AuthContext.Provider>
    )
}

export default AuthState