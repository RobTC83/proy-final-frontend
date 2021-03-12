import axios from 'axios'

const clienteAxios = axios.create({
    baseURL:'https://proyecto-final-backend-heroku.herokuapp.com'
})

export default clienteAxios
