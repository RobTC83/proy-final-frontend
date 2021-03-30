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
} from '../../types/index'


const AuthState = props => {

    //Datos iniciales para empezar el estado global
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: [], // info del usuario
        totalIngresos: null
    }

    const [state, dispatch] = useReducer(AuthReducer,initialState)

    // Registra un usuario

    const registrarUsuario = async datos => {
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

    // Traer los datos de los ingresos del usuario

    const mostrarIngresos = async() => {
        const resp = await clienteAxios.get('/ingresos/total')
        dispatch({
            type: OBTENER_INGRESOS,
            payload: resp.data.sumaIngresos
        })
        
    }


    return (
        <AuthContext.Provider value={{
            token: state.token,
            autenticado: state.autenticado,
            usuario: state.usuario,
            totalIngresos: state.totalIngresos,
            registrarUsuario,
            iniciarSesion,
            usuarioAutenticado,
            cerrarSesion,
            mostrarIngresos
        }}>
            {props.children}
            </AuthContext.Provider>
    )
}

export default AuthState