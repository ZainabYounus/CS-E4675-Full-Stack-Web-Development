import { initializeAnecdotes, saveVote } from '../reducers/anecdoteReducer'
import { useSelector } from 'react-redux'
import { notification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

export default function AnecdoteList({ dispatch }) {

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const vote = async (id, content) => {
    dispatch(saveVote(id))
    dispatch(notification(`you voted '${content}'`, 5000))
  }

  const anecdotes = useSelector(state => {
    return state.filter === 'ALL' ? [...state.anecdotes].sort((a, b) => b.votes - a.votes) : state.anecdotes.filter(anecdote => anecdote.content.toLowerCase()
    .includes(state.filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)
  })

  return (
    <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}