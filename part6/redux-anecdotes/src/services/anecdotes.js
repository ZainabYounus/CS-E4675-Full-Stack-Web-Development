import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (content) => {
  const anecdote = { content, votes: 0 }
  const res = await axios.post(baseUrl, anecdote)
  return res.data
}

const incrementVote = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  const updatedAnecdote = { ...anecdote.data, votes: anecdote.data.votes + 1 }
  const res = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return res.data
}

export {
  getAll, 
  createNew,
  incrementVote
}