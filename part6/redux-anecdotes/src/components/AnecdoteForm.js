import { addAnecdote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

export default function AnecdoteForm({ dispatch }) {

  const handleCreateAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(addAnecdote(content))

    dispatch(notification(`anecdote '${content}' created`, 5000))
  }

return(
  <div>
    <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
  </div>
  )
}