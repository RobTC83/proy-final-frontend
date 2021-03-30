import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import './App.css';


import EditarPerfil from './rutas/EditarPerfil'
import IniciarSesion from './rutas/IniciarSesion'
import Registro from './rutas/Registro'
import Tablero from './rutas/Tablero'

import Header from './components/Header'

import AuthState from './context/auth/AuthState'


function App(props) {
  return (
    <>
    <AuthState>
        <Router>
          <Switch>
              <Route exact path="/" component={IniciarSesion}/>
              <Route exact path="/registro" component={Registro}/>
              <Route path={"/"} render={() => (
                  <>
                    <Header />
                      <Switch>
                        <Route exact path="/usuarios/" component={Tablero}/>
                        <Route exact path="/editar-perfil/" component={EditarPerfil}/>
                      </Switch>
                  </>
                )} 
              />

              

          </Switch>

        </Router>

    </AuthState>

    

    </>
  );
}

export default App;
