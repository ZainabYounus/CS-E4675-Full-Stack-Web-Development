import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}
const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.post(baseUrl, newBlog, config)
}


// const update = (id, newObject) => {
//   const request = axios.put(`${ baseUrl }/${id}`, newObject)
//   return request.then(response => response.data)
// }

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog, setToken }

