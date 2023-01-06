import axios from 'axios'

const BaseURL = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(BaseURL)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(BaseURL, newObject)
    return request.then(response =>  response.data)
}

const remove = (id) => {
    const request = axios.delete(`${BaseURL}/${id}`)
    return request.then(response => response.data)
}

export default{getAll, create, remove}