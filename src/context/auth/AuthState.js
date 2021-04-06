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
    TOTAL_INGRESOS,
    TOTAL_PRESUPUESTOS,
    CREAR_INGRESO,
    CREAR_PRESUPUESTO,
    CREAR_GASTO,
    MOSTRAR_INGRESOS_USUARIO,
    MOSTRAR_PRESUPUESTOS_USUARIO,
    BORRAR_INGRESO,
    BORRAR_PRESUPUESTO,
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
        ingresosUsuario:null,
        presupuestosUsuario:null,
        gastosUsuario:null
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

    const calcularTotalIngresos = async() => {
        const resp = await clienteAxios.get('/ingresos/total')
        dispatch({
            type: TOTAL_INGRESOS,
            payload: resp.data.sumaIngresos
        })
        
    }

    // Traer cada uno de los ingresos del usuario

    const mostrarIngresosUsuario = async() => {
        const resp = await clienteAxios.get('/ingresos')
        
         dispatch({
             type: MOSTRAR_INGRESOS_USUARIO,
             payload: resp.data.ingresos
         })
    }

    // Traer cada uno de los presupuestos del usuario

    const mostrarPresupuestosUsuario = async() => {
        const resp = await clienteAxios.get('/presupuestos')
        //console.log("resp presupuestos", resp)
        dispatch({
            type: MOSTRAR_PRESUPUESTOS_USUARIO,
            payload: resp.data.presupuestos
        })
    }
    // Traer el total de los presupuestos del usuario

    const calcularTotalPresupuestos = async() => {
        const resp = await clienteAxios.get('/presupuestos/total')
        console.log("resp TOTAL presupuestos", resp)

        dispatch({
            type: TOTAL_PRESUPUESTOS,
            payload:resp.data.sumaPresupuestos
        })
        
    }

    // Crear gasto

    const crearGasto = async(gasto) => {
        const resp = await clienteAxios.post('/gastos',gasto)

        dispatch({
            type:CREAR_GASTO,
            payload: resp.data
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

    // Editar un ingreso

        // const editarIngreso = async(id,e) => {

        //     const res = await clienteAxios.post(`/ingresos/editar/${id}`,e)
        //     console.log("editar ingreso",res)
        //      dispatch({
        //          type: EDITAR_INGRESO,
        //          payload: state.ingresosUsuario
        //      })
        // }
    // Crear un nuevo presupuesto

    const crearPresupuesto = async(presupuesto) => {
        const resp = await clienteAxios.post('/presupuestos', presupuesto)

        dispatch({
            type:CREAR_PRESUPUESTO,
            payload: resp.data
        })
    }

      // Eliminar un presupuesto

      const borrarPresupuesto = async(id) => {
        const res = await clienteAxios.delete(`/presupuestos/${id}`)
        console.log("eliminar presupuesto",res)
        dispatch({
            type: BORRAR_PRESUPUESTO,
            payload: state.presupuestosUsuario
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
            presupuestosUsuario: state.presupuestosUsuario,
            gastosUsuario: state.gastosUsuario,
            registrarUsuario,
            iniciarSesion,
            usuarioAutenticado,
            cerrarSesion,
            calcularTotalIngresos,
            calcularTotalPresupuestos,
            mostrarGastos,
            crearIngreso,
            crearPresupuesto,
            crearGasto,
            mostrarIngresosUsuario,
            borrarIngreso,
            mostrarPresupuestosUsuario,
            borrarPresupuesto,
            
            

        }}>
            {props.children}
            </AuthContext.Provider>
    )
}

export default AuthState