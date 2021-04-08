
import React, {useContext, useState} from 'react'
import AuthContext from '../context/auth/AuthContext'

export default function EditarPerfil() {

    const {editarUsuario, usuario} = useContext(AuthContext)

    const [buttonState, setButtonState] = useState(false)
 
    const estatusBoton = ()=> {
     if(buttonState === false) {
         setButtonState(true)
     }}

     // State inicial de los campos del formulario

 const [form, setForm] = useState({
    username: null,
    email: null
})

// Desestructurar la info del formulario 
const {username, email} = form
  

     const onChange = e => {

        setForm({
          ...form,
          [e.target.name]: e.target.value
        })
        console.log(form)
      }

     
    //Cuando se llenen los campos

  const onSubmit = e => {
     e.preventDefault()

    //validar que no haya campos vacíos
    if(
      username === "" ||
      email === "" 
    
      ){

        console.log("Todos los campos son obligatorios")
        return
    }

    // pasarlo al action de la función
     editarUsuario({
       username,
       email
     })

     setForm(
       {
        username: "",
        email: "",
       }
     )
    
    setButtonState(false)
    

   
  
  }


    return (
        <div className="flex justify-end">
            <button className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"onClick={()=>estatusBoton()} >Editar perfil</button> 

            {!buttonState ? <p></p> : 
            
            <form onSubmit={(e)=>onSubmit(usuario.id)} className="space-y-1">
                <label className="">  Usuario{usuario.id}   </label>
                <input onChange={onChange} name="username" className="h-8 w-8/12"  type="text" placeholder={usuario.username} /><br/>
                <label className="">  Email   </label>
                <input onChange={onChange} name="email" type="text" className="h-8 w-9/12 pl-7 pr-12 sm:text-sm  border border-gray-600" placeholder={usuario.email}/><br/>
                
                <div className="flex justify-start mx-8 py-2 ">
                    <button type="submit" className="border-gray-700 bg-gray-300 text-gray-700 h-8 w-9/12">Guardar cambios</button>
                </div>
            </form>
}
            
        </div>
    )
}
