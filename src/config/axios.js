import axios from 'axios'

const clienteAxios = axios.create({
        baseURL:'http://localhost:4000'
    // baseURL:'https://proyecto-final-backend-heroku.herokuapp.com'
})

export default clienteAxios
